const Feedback = require("../models/FeedbackModel");

const getFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (err) {
        next(err);
    }
};

const createFeedback = async (req, res, next) => {
    const newFeedback = new Feedback(req.body);
    try {
        const savedFeedback = await newFeedback.save();
        res.status(200).json({ error: false, savedFeedback });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getFeedbacks,
    createFeedback
};
