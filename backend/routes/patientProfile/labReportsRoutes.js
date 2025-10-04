const router = require("express").Router();
const labController = require("../../controllers/patientProfile/labReportsController");

router.get("/", labController.getLabReports);

module.exports = router;
