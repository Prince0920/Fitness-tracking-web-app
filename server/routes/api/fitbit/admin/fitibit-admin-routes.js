const router = require('express').Router();

const passport = require('passport');
const { syncData } = require('../../../../controllers/fitbit/admin/fitbit-admin-controller');
const { authMiddleware } = require('../../../../utils/auth');

// /api/fitbit/admin/sync-data
router.route('/sync-data').get(authMiddleware, syncData);

module.exports = router;
