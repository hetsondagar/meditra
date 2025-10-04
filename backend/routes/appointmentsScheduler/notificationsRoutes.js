const router = require("express").Router();
const notificationsController = require("../../controllers/notificationsController");

router.get("/", notificationsController.getNotifications);
router.put("/:id/read", notificationsController.markAsRead);

module.exports = router;
