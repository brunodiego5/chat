import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import routes from './routes';
import websocket from './WebSocket';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();

    this.http = http.createServer(this.server);

    mongoose.connect(
      'mongodb+srv://brunodiego5:brunodiego5@cluster0-fwtlo.mongodb.net/chat?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    websocket.setupWebsocket(this.http);
  }

  // todos os middlewares do app
  middlewares() {
    this.server.use(cors('*'));
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

// exportar apenas o server
export default new App().server;
