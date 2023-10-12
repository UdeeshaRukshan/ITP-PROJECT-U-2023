const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: { type: String },
  useremail: { type: String },
});

const Image = new mongoose.model("Image", imageSchema);
module.exports = Image;
