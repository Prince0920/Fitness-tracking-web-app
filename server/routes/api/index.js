const router = require("express").Router();
const userRoutes = require("./user-routes");
const exerciseRoutes = require("./exercise-routes");
const fitbitRoutes = require('./fitbit/fitbit-routes');

router.use("/user", userRoutes);
router.use("/exercise", exerciseRoutes);
router.use("/fitbit", fitbitRoutes);

module.exports = router;
