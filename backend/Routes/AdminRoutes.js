const { authAdmin, addAdmin, searchUser, sendNotification, getAllNotifications } = require("../Controllers/AdminController");

const router = require("express").Router();


router.post("/signin", authAdmin);
router.post("/signup", addAdmin);
router.get("/search", searchUser);
router.post("/send-notification", sendNotification);
router.get("/get-all-notifications",getAllNotifications)

module.exports = router;