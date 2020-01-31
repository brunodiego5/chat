import Message from '../models/Message';

class SearchMessageController {
  async index(request, response) {
    // buscar todas  as mensagens num raio de 10km

    const { latitude, longitude } = request.query; // desestruturação

    // console.log(request.query);

    const messages = await Message.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({ messages });
  }
}

export default new SearchMessageController();
