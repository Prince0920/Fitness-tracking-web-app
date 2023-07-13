const router = require('express').Router();
const userRoutes = require('./user-routes');
const exerciseRoutes = require('./exercise-routes');
const fitbitRoutes = require('./fitbit/fitbit-routes');
const stravaRoutes = require('./strava/strava-routes');
const userListRoute = require('./admin/user-list-route');
const ttsRoute = require('./tts/tts-route');
const appleAdminRoute = require('./apple/admin/apple-admin-routes')

router.use('/user', userRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/fitbit', fitbitRoutes);
router.use('/strava', stravaRoutes);
router.use('/admin', userListRoute);
router.use('/tts', ttsRoute);
router.use('/apple/admin', appleAdminRoute);

module.exports = router;
