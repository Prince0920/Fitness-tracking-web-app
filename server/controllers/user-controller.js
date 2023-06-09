const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by id or username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    })
      .select('-__v')
      .populate('cardio')
      .populate('resistance');

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },

  // create a user, sign a token, and send it back to sign up page
  async createUser({ body }, res) {
    try {
      if (body.password != body.confirmPassword) {
        return res.status(422).json({ message: 'Passowrd and confirm password not match!' });
      }
      const user = await User.create(body);
      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = {};
        for (let key in error.errors) {
          validationErrors[key] = error.errors[key].message;
        }
        // console.log('Validation errors:', Object.values(validationErrors)[0]);
        return res.status(422).json({ message: Object.values(validationErrors)[0] });
      } else {
        // Handle other types of errors
        // console.error('Error:', error);
        return res.status(409).json({ error });
      }
    }
  },

  // login a user, sign a token, and send it back to login page
  async login({ body }, res) {
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong!' });
    }
  },
};
