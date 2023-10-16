const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    satisfied: { type: String, required: true, enum: ['YES', 'NO'] },
    rate: { type: String, required: true, enum: ['EXCELLENT', 'VERY GOOD', 'GOOD', 'AVERAGE', 'POOR'] },
    recommendation: { type: String },
    user: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
