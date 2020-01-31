import Message from '../models/Message';

import websocket from '../../WebSocket';

// index, show, store, update, destroy

class MessageController {
  async index(request, response) {
    const messages = await Message.find();

    return response.json(messages);
  }

  async store(request, response) {
    const { text, latitude, longitude, user } = request.body; // desestruturação

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    // Object short syntax
    const message = await Message.create({
      text,
      location,
      user,
    });

    // Filtrar as conexões que estao no maximo 10km de distancia
    // e que o novo user tenha pelo menos uma das tecnologias filtradas

    const sendSocketMessageTo = websocket.findConnectionsByCoordinates({
      latitude,
      longitude,
    });

    websocket.sendMessage(sendSocketMessageTo, 'new-message', message);

    return response.json(message);
  }
}

export default new MessageController();
