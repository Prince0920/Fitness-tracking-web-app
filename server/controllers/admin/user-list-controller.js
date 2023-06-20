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
