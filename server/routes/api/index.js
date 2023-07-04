const router = require('express').Router();
const userRoutes = require('./user-routes');
const exerciseRoutes = require('./exercise-routes');
const fitbitRoutes = require('./fitbit/fitbit-routes');
const userListRoute = require('./admin/user-list-route');
const ttsRoute = require('./tts/tts-route');

router.use('/user', userRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/fitbit', fitbitRoutes);
router.use('/admin', userListRoute);
router.use('/tts', ttsRoute);

module.exports = router;
