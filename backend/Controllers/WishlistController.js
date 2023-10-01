const WishListItem = require("../models/wishlist");

module.exports.WishlistAdd = async (req, res) => {
  try {
    // extract itemId from the request body
    const { itemId } = req.body;

    // extract userId from the request cookies
    const { userId } = req.cookies;

    console.log(itemId);
    console.log(userId);

    const withListExsist = await WishListItem.findOne({ userId });

    console.log(withListExsist);

    if (withListExsist) {
      const wishListItem = await WishListItem.findOneAndUpdate(
        { userId },
        { $push: { itemId } },
        { new: true }
      );
      res.status(200).json(wishListItem);
    } else {
      const wishListItem = await WishListItem.create({ userId, itemId });
      res.status(201).json(wishListItem);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch all wish list items
module.exports.WishlistDisplay = async (req, res) => {
  try {
    // get user Id from the cookies
    const { userId } = req.cookies;

    console.log(userId);
    // get all item details
    const items = await WishListItem.findOne({ userId }).populate("itemId");

    console.log(items);
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteItemWishList = async (req, res) => {
  try {
    // get user Id from the cookies
    const { userId } = req.cookies;

    // get item Id from request params
    const {itemId} = req.params;

    console.log(userId);
    console.log(itemId);

    // delete item from the list
    const deletedItem = await WishListItem.findOneAndUpdate({userId},{$pull : {itemId}},{new : true});

    res.status(200).json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
