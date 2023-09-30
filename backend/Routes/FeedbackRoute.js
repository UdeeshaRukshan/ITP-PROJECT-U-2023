const express = require("express");
const feedback = require("../Controllers/FeedbackController");

const router = express.Router();

router.get("/", feedback.getFeedbacks);
router.get("/:id", feedback.getFeedback);
router.post("/create", feedback.createFeedback);
router.put("/update/:id", feedback.updateFeedback);
router.post("/delete/:id", feedback.deleteFeedbacksById);

module.exports = router;