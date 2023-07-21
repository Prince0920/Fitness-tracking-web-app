const router = require('express').Router();

const passport = require('passport');
const { syncData } = require('../../../../controllers/fitbit/admin/fitbit-admin-controller');

// /api/fitbit/admin/sync-data
router.route('/sync-data').get(syncData);


module.exports = router;
