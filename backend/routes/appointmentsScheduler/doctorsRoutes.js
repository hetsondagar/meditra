const router = require("express").Router();
const doctorsController = require("../../controllers/doctorsController");

router.get("/", doctorsController.getDoctors);

module.exports = router;
