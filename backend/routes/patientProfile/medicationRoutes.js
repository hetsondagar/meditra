const router = require("express").Router();
const medsController = require("../../controllers/patientProfile/medicationController");

router.get("/", medsController.getMedications);

module.exports = router;
