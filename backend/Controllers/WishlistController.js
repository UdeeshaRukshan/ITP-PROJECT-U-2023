const WishListItem = require("../models/wishlist");

module.exports.WishlistAdd = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newItem = new WishListItem({ name, description, price });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch all wish list items
module.exports.WishlistDisplay = async (req, res) => {
  try {
    const items = await WishListItem.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
