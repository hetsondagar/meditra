const router = require("express").Router();
const appointmentRoutes = require("./appointmentRoutes");
const doctorsRoutes = require("./doctorsRoutes");
const notificationRoutes = require("./notificationsRoutes");
router.use("/appointments", appointmentRoutes);
router.use("/doctors", doctorsRoutes);
router.use("/notifications", notificationRoutes);
module.exports = router;
