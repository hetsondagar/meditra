const router = require("express").Router();
const appointmentsController = require("../../controllers/appointmentsController");

router.get("/", appointmentsController.getAppointments);
router.post("/", appointmentsController.addAppointment);

module.exports = router;
