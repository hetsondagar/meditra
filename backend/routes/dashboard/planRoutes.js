const router = require("express").Router();
const planController = require("../../controllers/dashboard/planController");
router.get("/today", planController.getTodaysPlan);
router.post("/:id/complete", planController.completePlanItem);
router.post("/", planController.createPlanItem);
router.put("/:id", planController.updatePlanItem);
router.get("/:id", planController.getPlanItem);
module.exports = router;
