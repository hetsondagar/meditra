const router = require("express").Router();
const healthController = require("../../controllers/dashboard/healthController");
router.get("/metrics", healthController.getMetrics);
router.get("/metrics/history", healthController.getMetricsHistory);
module.exports = router;
