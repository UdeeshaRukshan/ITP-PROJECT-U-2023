const mongoose = require("mongoose");

const WishListItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const WishListItem = mongoose.model("WishListItem", WishListItemSchema);

module.exports = WishListItem;
