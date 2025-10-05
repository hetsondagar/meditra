import express from "express";
import { getHealthMetrics } from "../../controllers/analytics/metricsController.js";

const router = express.Router();

// GET /api/dashboard/health/metrics
router.get("/", getHealthMetrics);

export default router;
