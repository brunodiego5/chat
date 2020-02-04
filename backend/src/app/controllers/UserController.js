import * as Yup from 'yup';
import User from '../models/User';

// index, show, store, update, destroy

class UserController {
  async index(request, response) {
    const users = await User.find();

    return response.json(users);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ email: request.body.email });

    if (userExists) {
      return response.status(400).json({ error: ' User already exists.' });
    }

    const { latitude, longitude, ...rest } = request.body; // desestruturação

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const user = { rest, location };

    // Object short syntax
    const { id, name, email, provider } = await User.create(user);

    return response.json({ id, name, email, location, provider });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const userLogged = await User.findById(req.userId);

    if (email !== userLogged.email) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await userLogged.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { latitude, longitude, ...rest } = req.body; // desestruturação

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const user = { rest, location };

    // Object short syntax
    const { id, name, provider } = await User.update(user);

    return res.json({ id, name, email, location, provider });
  }
}

export default new UserController();
