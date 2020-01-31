import User from '../models/User';

// index, show, store, update, destroy

class UserController {
  async index(request, response) {
    const users = await User.find();

    return response.json(users);
  }

  async store(request, response) {
    const { name, email, latitude, longitude } = request.body; // desestruturação

    let user = await User.findOne({ email });
    if (!user) {
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      // Object short syntax
      user = await User.create({
        name,
        email,
        location,
      });
    }

    return response.json(user);
  }
}

export default new UserController();
