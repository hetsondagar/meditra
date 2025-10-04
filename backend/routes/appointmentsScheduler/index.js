const router = require("express").Router();
const appointmentRoutes = require("./appointmentRoutes");
const doctorsRoutes = require("./doctorsRoutes");
const notificationRoutes = require("./notificationRoutes");
router.use("/appointments", healthRoutes);
router.use("/doctors", planRoutes);
router.use("/notifications", reportRoutes);
module.exports = router;
