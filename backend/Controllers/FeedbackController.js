const Feedback = require("../models/FeedbackModel");

const getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    next(err);
  }
};

const getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    res.status(200).json(feedback);
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
};

const updateFeedback = async (req, res, next) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedFeedback);
  } catch (err) {
    next(err);
  }
};

const deleteFeedbacksById = async (req, res, next) => {
  const id = req.params.id;
  const feedback = await Feedback.findByIdAndDelete(id);
  try {
    if (feedback) {
      return res.status(200).json({
        error: false,
        message: "Feedback Deleted!",
        deletedFeedback: feedback,
      });
    }
    return res.status(200).json({ error: true, message: "No Feedback Found!" });
  } catch (err) {
    next(err);
  }
};

const searchFeedback = async (req, res, next) => {
  try {
    const query = req.body.query;
    const results = await Feedback.find({
      $or: [
        { customerName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

const getRatingsCount = async (req, res, next) => {
  try {
    const ratingsCount = await Feedback.aggregate([
      {
        $group: {
          _id: "$rate",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const transformedResult = ratingsCount.map((item) => ({
      [item._id]: item.count,
    }));
    res.status(200).json(transformedResult);
  } catch (err) {
    next(err);
  }
};

const getReviewCountByMonth = async (req, res, next) => {
  try {
    const reviewCounts = await Feedback.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).json(reviewCounts);
  } catch (err) {
    next(err);
  }
};

const getReviewStats = async (req, res, next) => {
  try {
    const totalReviewCount = await Feedback.countDocuments();
    const uniqueUserCount = await Feedback.distinct("user").count();
    res.status(200).json({ totalReviewCount, uniqueUserCount });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getFeedback,
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedbacksById,
  searchFeedback,
  getRatingsCount,
  getReviewCountByMonth,
  getReviewStats,
};
