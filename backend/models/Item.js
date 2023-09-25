
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
    trim: true, // Removes leading/trailing whitespaces
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  price: {
    type: Number,
    required: true, // Price is required
    min: 0, // Minimum price value
  },
  category: {
    type: String,
    required: true, // Category is required
  },
  imageUrl: {
    type: String,
    required: true, // Image URL is required
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Item', itemSchema);
