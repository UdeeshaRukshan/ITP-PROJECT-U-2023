const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
