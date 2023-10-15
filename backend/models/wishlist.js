const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  userId : {
    type : String,
  },
  itemId: [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Property"
    }
  ]
},{timestamps : true});

const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);

module.exports = WishlistItem;
