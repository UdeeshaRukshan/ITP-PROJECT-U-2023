const mongoose = require("mongoose");

const WishListSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    content: { // New property 'content'
      type: String, // Assuming content is a string, you can change the type as needed
    },
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = { WishList };
