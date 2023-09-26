const Wishlist = require('../models/Wishlist');

// Get the user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne(); // Assuming there's only one wishlist
    res.json(wishlist.items);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch wishlist' });
  }
};

// Add an item to the wishlist
exports.addToWishlist = async (req, res) => {
  const itemId = req.body.itemId; // Assuming you send the item ID in the request body

  try {
    const wishlist = await Wishlist.findOne(); // Assuming there's only one wishlist
    wishlist.items.push(itemId);
    const updatedWishlist = await wishlist.save();
    res.json(updatedWishlist.items);
  } catch (err) {
    res.status(500).json({ error: 'Unable to add item to wishlist' });
  }
};

// Remove an item from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const wishlist = await Wishlist.findOne(); // Assuming there's only one wishlist
    wishlist.items.pull(itemId);
    const updatedWishlist = await wishlist.save();
    res.json(updatedWishlist.items);
  } catch (err) {
    res.status(500).json({ error: 'Unable to remove item from wishlist' });
  }
};
