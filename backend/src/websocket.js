const socketio = require('socket.io');
const calculateDistance = require('./utils/calculateDistance');

let io;
//em uma aplicação, poderia usar um banco de dados, redis por exemplo
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    //listen no connection
    io.on('connection', socket => { 
        const { latitude, longitude } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                 longitude: Number(longitude),
            }
        });

        console.log(connections);
    });
};

exports.findConnectionsByCoordinates = (coordinates) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}