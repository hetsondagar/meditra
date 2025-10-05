const router = require("express").Router();
const doctorsController = require("../../controllers/appointmentScheduler/doctorsController");

router.get("/", doctorsController.getDoctors);

module.exports = router;
