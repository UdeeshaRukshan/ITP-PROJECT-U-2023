const express = require("express");
const feedback = require("../Controllers/FeedbackController");

const router = express.Router();

router.get("/", feedback.getFeedbacks);
router.get("/:id", feedback.getFeedback);
router.post("/create", feedback.createFeedback);
router.put("/update/:id", feedback.updateFeedback);
router.post("/delete/:id", feedback.deleteFeedbacksById);
router.post("/search", feedback.searchFeedback);
router.get("/report/rate", feedback.getRatingsCount);
router.get("/report/month", feedback.getReviewCountByMonth);
router.get("/report/stats", feedback.getReviewStats);

module.exports = router;