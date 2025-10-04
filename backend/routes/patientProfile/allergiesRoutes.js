const router = require("express").Router();
const allergiesController = require("../../controllers/patientProfile/allergiesController");

router.get("/", allergiesController.getAllergies);

module.exports = router;
