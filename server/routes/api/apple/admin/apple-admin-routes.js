const router = require('express').Router();

const passport = require('passport');
const { activityData, loginAppleWatch, registerAppleWatch } = require('../../../../controllers/apple/admin/apple-admin-controller');

// /api/apple/admin/login
router.route('/login').get(loginAppleWatch);

// /api/apple/admin/register
router.route('/register').post(registerAppleWatch);

// /api/apple/admin/activity-data
router.route('/activity-data').post(activityData);


module.exports = router;
