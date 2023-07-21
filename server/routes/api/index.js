const router = require('express').Router();
const userRoutes = require('./user-routes');
const exerciseRoutes = require('./exercise-routes');
const fitbitRoutes = require('./fitbit/user/fitbit-user-routes');
const fitbitAdminRoutes = require('./fitbit/admin/fitibit-admin-routes');
const stravaRoutes = require('./strava/user/strava-user-routes');
const userListRoute = require('./admin/user-list-route');
const ttsRoute = require('./tts/tts-route');
const appleAdminRoute = require('./apple/admin/apple-admin-routes')

router.use('/user', userRoutes);
router.use('/exercise', exerciseRoutes);
router.use('/fitbit', fitbitRoutes);
router.use('/fitbit/admin', fitbitAdminRoutes);
router.use('/strava', stravaRoutes);
router.use('/admin', userListRoute);
router.use('/tts', ttsRoute);
router.use('/apple/admin', appleAdminRoute);

module.exports = router;
