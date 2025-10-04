const router = require("express").Router();
const reportController = require("../../controllers/dashboard/reportController");
router.get("/recent", reportController.getRecentReports);
router.get("/:id", reportController.getReportById);
router.get("/:id/download", reportController.downloadReport);
router.post("/upload", reportController.uploadReport);
module.exports = router;
