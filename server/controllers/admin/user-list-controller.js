const { User } = require('../../models');

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
      res.status(400).json({ message: 'Something went wrong!' });
    }
  },

  // get a single user by id
  async getUser(req, res) {
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

  // update a single user by id
  async updateUser(req, res) {
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

  // update a single user by id
  async deleteUser(req, res) {
    try {
      const { user } = req;
      const deleteUser = await User.findOneAndDelete({ _id: user._id });
      if (!deleteUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(deleteUser);
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong!' });
    }
  },
};
