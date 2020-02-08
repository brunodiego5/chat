import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import routes from './routes';
import websocket from './WebSocket';

/* tem que importar pra executar a conexão */
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();

    this.http = http.createServer(this.server);

    websocket.setupWebsocket(this.http);
  }

  // todos os middlewares do app
  middlewares() {
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
  }
}

// exportar apenas o server
export default new App().server;
