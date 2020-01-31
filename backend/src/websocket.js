import socketio from 'socket.io';
import calculateDistance from './utils/calculateDistance';

class WebSocket {
  constructor() {
    this.io = {};
    // em uma aplicação, poderia usar um banco de dados, redis por exemplo
    this.connections = [];
  }

  setupWebsocket(server) {
    this.io = socketio(server);

    // listen no connection
    this.io.on('connection', socket => {
      const { latitude, longitude } = socket.handshake.query;

      this.connections.push({
        id: socket.id,
        coordinates: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
      });

      // console.log(this.connections);
    });
  }

  findConnectionsByCoordinates(coordinates) {
    return this.connections.filter(connection => {
      return (
        calculateDistance.getDistanceFromLatLonInKm(
          coordinates,
          connection.coordinates
        ) < 10
      );
    });
  }

  sendMessage(to, message, data) {
    to.forEach(connection => {
      this.io.to(connection.id).emit(message, data);
    });
  }
}

export default new WebSocket();
