// backend/models/WishlistItem.js

const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
