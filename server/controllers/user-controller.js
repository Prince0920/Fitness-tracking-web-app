const { User } = require('../models');
const Token = require('../models/Token');
const { signToken } = require('../utils/auth');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');

const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = 'localhost:3132';

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

  // reset password link
  async requestPasswordReset({ body }, res) {
    const { email } = body;
    try {
      const user = await User.findOne({ email });

      if (!user) return res.status(409).json({ message: 'User does not exist' });
      let token = await Token.findOne({ userId: user._id });
      if (token) await token.deleteOne();
      let resetToken = crypto.randomBytes(32).toString('hex');
      const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

      await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
      }).save();

      const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
      sendEmail(
        user.email,
        'Password Reset Request',
        { name: user.name, link: link },
        './template/requestResetPassword.handlebars'
      );
      res.json({ link });
    } catch (error) {
      res.status(409).json({ message: 'Something went wrong!' });
    }
  },

  // reset password
  async resetPassword({ body }, res) {
    try {
      const { userId, token, password } = body;
      let passwordResetToken = await Token.findOne({ userId });
      if (!passwordResetToken) {
        return res.status(400).json({ message: 'Invalid or expired password reset token' });
      }
      const isValid = await bcrypt.compare(token, passwordResetToken.token);
      if (!isValid) {
        return res.status(400).json({ message: 'Invalid or expired password reset token' });
      }
      const hash = await bcrypt.hash(password, Number(bcryptSalt));
      await User.updateOne({ _id: userId }, { $set: { password: hash } }, { new: true });
      const user = await User.findById({ _id: userId });
      sendEmail(
        user.email,
        'Password Reset Successfully',
        {
          name: user.name,
        },
        './template/resetPassword.handlebars'
      );
      await passwordResetToken.deleteOne();
      res.json({ message: 'Success' });
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong!' });
    }
  },

  // get user profile data
  async getProfile(req, res) {
    try {
      const { user } = req;
      const foundUser = await User.findOne({ _id: user._id });

      if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(foundUser);
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong!' });
    }
  },

  // update user profile data
  async updateProfile(req, res) {
    try {
      const { user, body } = req;
      const updatedUser = await User.findOneAndUpdate({ _id: user._id }, body, { new: true });
      if (!updatedUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong!' });
    }
  },
};
