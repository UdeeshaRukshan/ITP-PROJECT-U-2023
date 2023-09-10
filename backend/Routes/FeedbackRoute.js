const express = require("express");
const feedback = require("../Controllers/FeedbackController");

const router = express.Router();

router.get("/", feedback.getFeedbacks);
router.post("/create", feedback.createFeedback);

module.exports = router;