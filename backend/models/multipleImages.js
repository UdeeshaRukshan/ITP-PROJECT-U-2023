// models/Image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: String,
  publicId: String,
});

module.exports = mongoose.model("MultipleImages", imageSchema);
