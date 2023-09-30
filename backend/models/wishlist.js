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
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = { WishList };
