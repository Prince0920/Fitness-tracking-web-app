const router = require('express').Router();

const passport = require('passport');
const { syncData } = require('../../../../controllers/fitbit/admin/fitbit-admin-controller');
const { authMiddleware, ensureFitibitAuthenticated } = require('../../../../utils/auth');

// /api/fitbit/admin/sync-data
router.route('/sync-data').get(authMiddleware, ensureFitibitAuthenticated, syncData);

module.exports = router;
