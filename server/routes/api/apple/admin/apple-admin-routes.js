const router = require('express').Router();

const passport = require('passport');
const { activityData } = require('../../../../controllers/apple/admin/apple-admin-controller');

// /api/apple/admin/activity-data
router.route('/activity-data').post(activityData);


module.exports = router;
