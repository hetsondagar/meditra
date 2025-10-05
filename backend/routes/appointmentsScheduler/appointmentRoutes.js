const router = require("express").Router();
const appointmentsController = require("../../controllers/appointmentScheduler/appointmentsController");
router.get("/", appointmentsController.getAppointments);
router.post("/", appointmentsController.addAppointment);
router.delete("/:id", appointmentsController.deleteAppointment);
module.exports = router;
