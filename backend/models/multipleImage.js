const mongoose = require("mongoose");

const MultiImageSchema = new mongoose.Schema({
  ImageUrl: { type: String },
});

const Image = new mongoose.model("MultipleImage", MultiImageSchema);
module.exports = MultipleImage;
