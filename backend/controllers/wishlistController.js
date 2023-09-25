// backend/controllers/wishlistController.js

const WishlistItem = require('../models/WishlistItem');

// Create a new wishlist item
exports.createItem = async (req, res) => {
  try {
    const newItem = new WishlistItem(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create wishlist item' });
  }
};

// Get all wishlist items
exports.getAllItems = async (req, res) => {
  try {
    const items = await WishlistItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve wishlist items' });
  }
};

// Update a wishlist item by ID
exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await WishlistItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update wishlist item' });
  }
};

// Delete a wishlist item by ID
exports.deleteItem = async (req, res) => {
  try {
    await WishlistItem.findByIdAndRemove(req.params.id);
    res.json({ message: 'Wishlist item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete wishlist item' });
  }
};
