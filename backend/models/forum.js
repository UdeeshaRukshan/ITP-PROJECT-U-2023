const mongoose = require("mongoose");

const ForumSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    createdDate: { // Change 'publishYear' to 'createdDate'
      type: Date, // Assuming 'createdDate' is still a number, you can change the type as needed
      required: true,
    },
    content: {
      type: String,
      // Add any other properties or validation you need for 'content'
    },
  },
  {
    timestamps: true,
  }
);

const Forum = mongoose.model("Forum", ForumSchema);

module.exports = { Forum };