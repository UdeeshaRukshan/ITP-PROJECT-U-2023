const WishListItem = require("../models/wishlist");

module.exports.WishlistAdd = async (req, res) => {
  try {
    const { pId } = req.params;
    const { name, itemid } = req.body;
    const newItem = new WishListItem({ name, itemid });
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
