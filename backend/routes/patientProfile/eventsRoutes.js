const router = require("express").Router();
const eventsController = require("../../controllers/patientProfile/eventsController");

router.get("/", eventsController.getHealthEvents);

module.exports = router;
