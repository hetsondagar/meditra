const router = require("express").Router();
const metricsController = require("../../controllers/patientProfile/metricsController");

router.get("/", metricsController.getHealthMetrics);

module.exports = router;
