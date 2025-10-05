import express from "express";
import { getMetricsHistory } from "../../controllers/analytics/metricsHistoryController.js";

const router = express.Router();

// GET /api/dashboard/health/metrics/history?metric=heartRate&range=7days
router.get("/", getMetricsHistory);

export default router;
