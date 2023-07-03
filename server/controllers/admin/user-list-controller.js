const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = {
  // get a user list
  async getUsers(req, res) {
    try {
      const userList = await User.find();
      if (!userList) {
        return res.status(400).json({ message: 'Cannot find a user list!' });
      }
      res.json(userList);
    } catch (error) {
      console.log('Error in getUsers', error);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  // get a single user by id
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const foundUser = await User.findOne({ _id: id });

      if (!foundUser) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(foundUser);
    } catch (error) {
      console.log('Error in getUser', error);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  // Create User
  async createUser(req, res) {
    try {
      const { body } = req;
      const { username, email, password } = body;

      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists!' });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create the new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      res.json(savedUser);
    } catch (error) {
      console.log('Error in createUser', error);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  // update a single user by id
  async updateUser(req, res) {
    try {
      const { params, body } = req;
      const newPassword = body.password;

      const data = body;
      delete data.password;

      let hashPassword = '';
      if (newPassword) {
        const saltRounds = 10;
        hashPassword = await bcrypt.hash(newPassword, saltRounds);
      }
      if (hashPassword) {
        data.password = hashPassword;
      }

      const updatedUser = await User.findOneAndUpdate({ _id: params.id }, body, { new: true });
      if (!updatedUser) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(updatedUser);
    } catch (error) {
      console.log('Error in updateUser', error);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  // update a single user by id
  async deleteUser(req, res) {
    try {
      const { params } = req;
      const deleteUser = await User.findOneAndDelete({ _id: params.id });
      if (!deleteUser) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(deleteUser);
    } catch (error) {
      console.log('Error in deleteUser', error);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  },
};
