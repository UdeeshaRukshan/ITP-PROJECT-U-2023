const express = require("express");
const router = express.Router();
const {
  WishlistAdd,
  WishlistDisplay,
} = require("../Controllers/WishlistController");

router.post("/add-to-wishlist/:pId", WishlistAdd);

// Get all items in the wishlist
router.get("/wishlist", WishlistDisplay);

module.exports = router;
