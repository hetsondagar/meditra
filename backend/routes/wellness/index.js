const express = require("express");
const { getWellnessData } = require("../../controllers/wellness/wellnessController");
const router = express.Router();
router.get("/", getWellnessData);
module.exports = router;