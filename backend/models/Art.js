const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artSchema = new Schema({
  title: {
    type: String,
    required: true, //backend validation
  },
  medium: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  images: [{ type: String }], // Store multiple image URLs or file names in an array
});

const Art = mongoose.model("Art", artSchema);

module.exports = Art;
