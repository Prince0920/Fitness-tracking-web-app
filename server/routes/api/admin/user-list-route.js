const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require('../../../controllers/admin/user-list-controller');
// import middleware
const { authMiddleware } = require('../../../utils/auth');

// /api/admin/userList to get user list
router.route('/users').get(authMiddleware, getUsers);

// /api/admin/createUser 
router.route('/createUser').post(authMiddleware, createUser);

// /api/admin/user
router.route('/user/:id').get(authMiddleware, getUser);
router.route('/user/:id').put(authMiddleware, updateUser).delete(authMiddleware, deleteUser);

module.exports = router;
