const express = require("express");
const router = express.Router();
const {
  WishlistAdd,
  WishlistDisplay,
  deleteItemWishList,
} = require("../Controllers/WishlistController");

router.post("/add-to-wishlist", WishlistAdd);

// Get all items in the wishlist
router.get("/wishlist", WishlistDisplay);

// delete item from wishlist
router.delete("/withlist/delete/:itemId",deleteItemWishList);
module.exports = router;
