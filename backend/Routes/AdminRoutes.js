const { authAdmin, addAdmin, searchUser, sendNotification, getAllNotifications, getUserById, updateNotification, deleteNotification, sendEmail } = require("../Controllers/AdminController");

const router = require("express").Router();


router.post("/signin", authAdmin);
router.post("/signup", addAdmin);
router.get("/search", searchUser);
router.post("/send-notification", sendNotification);
router.get("/get-all-notifications",getAllNotifications)
router.post("/get-user-by-id",getUserById)
router.post("/update-notification", updateNotification);
router.post("/delete-notification", deleteNotification);
router.post("/sendEmail",sendEmail)

module.exports = router;