import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import routes from './routes';
import websocket from './WebSocket';

class App {
  constructor() {
    this.server = express();

    this.http = http.Server(this.server);

    this.middlewares();
    this.routes();

    websocket.setupWebsocket(this.http);

    mongoose.connect(
      'mongodb+srv://brunodiego5:brunodiego5@cluster0-fwtlo.mongodb.net/chat?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }

  // todos os middlewares do app
  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

// exportar apenas o server
export default new App().server;
