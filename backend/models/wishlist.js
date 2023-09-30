const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  itemid: {
    type: String,
  },
  // You can add more fields to your wishlist item model as needed
  // Example:
  // description: String,
  // price: Number,
  // imageUrl: String,
  // ...
});

const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);

module.exports = WishlistItem;
