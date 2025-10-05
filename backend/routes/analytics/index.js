const router = require("express").Router();

// Import all controllers
const metricsController = require("../../controllers/analytics/metricsController");
const metricHistoryController = require("../../controllers/analytics/metricHistoryController");
const sleepController = require("../../controllers/analytics/sleepController");
const activityController = require("../../controllers/analytics/activityController");
const vitalsController = require("../../controllers/analytics/vitalsController");
const insightsController = require("../../controllers/analytics/insightsController");

// Routes
router.get("/metrics", metricsController.getMetrics);
router.get("/metric-history", metricHistoryController.getMetricHistory);
router.get("/sleep", sleepController.getSleepData);
router.get("/activity", activityController.getActivityData);
router.get("/vitals", vitalsController.getVitals);
router.get("/insights", insightsController.getInsights);

module.exports = router;
