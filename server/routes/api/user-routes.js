const router = require('express').Router();
const {
  createUser,
  login,
  getSingleUser,
  requestPasswordReset,
  resetPassword,
  getProfile,
  updateProfile,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
// /api/user for user signup
router.route('/').post(createUser);

// /api/user/login for user login
router.route('/login').post(login);

// /api/user/requestResetPassword
router.route('/requestResetPassword').post(requestPasswordReset);

// /api/user/resetPassword
router.route('/resetPassword').post(resetPassword);

// /api/user/profile
router.route('/profile').get(authMiddleware, getProfile).put(authMiddleware, updateProfile);

// /api/user/me to get single user data
router.route('/me').get(authMiddleware, getSingleUser);

module.exports = router;
