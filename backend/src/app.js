import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';

import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import 'express-async-errors'; // tem que importar antes das routas

import routes from './routes';
import websocket from './WebSocket';

/* tem que importar pra executar a conexão */
import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();

    this.http = http.createServer(this.server);

    websocket.setupWebsocket(this.http);
  }

  // todos os middlewares do app
  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors('*'));
    this.server.use(express.json());
    /* habilitar o acesso para arquivos static */
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
}

// exportar apenas o server
export default new App().server;
