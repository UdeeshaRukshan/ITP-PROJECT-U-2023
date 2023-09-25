const Wishlist = require('../models/Wishlist');
const Item = require('../models/Item');

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ userId }).populate('items');
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { itemId } = req.body;
    
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      const newWishlist = new Wishlist({ userId, items: [itemId] });
      await newWishlist.save();
      res.status(201).json(newWishlist);
    } else {
      wishlist.items.push(itemId);
      await wishlist.save();
      res.json(wishlist);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const wishlist = await Wishlist.findOne({ userId });

    if (wishlist) {
      wishlist.items = wishlist.items.filter((item) => item.toString() !== itemId);
      await wishlist.save();
    }

    res.json({ message: 'Item removed from wishlist' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
