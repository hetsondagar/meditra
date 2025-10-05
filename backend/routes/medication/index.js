// routes/medication/index.js

const express = require("express");
const router = express.Router();
const {
  getMedications,
  addMedication,
  updateMedication,
  getAdherence,
  getBadges,
} = require("../../controllers/medication/medicationController");
router.get("/", getMedications);
router.post("/", addMedication);
router.put("/:id", updateMedication);
router.get("/adherence", getAdherence);
router.get("/badges", getBadges);

module.exports = router;
