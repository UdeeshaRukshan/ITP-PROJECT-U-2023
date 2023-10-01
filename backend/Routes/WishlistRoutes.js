const express = require("express");
const router = express.Router();
const {
  WishlistAdd,
  WishlistDisplay,
  deleteItemWishList,
} = require("../Controllers/WishlistController");

router.post("/add-to-wishlist", WishlistAdd);
router.get("/getWishlist",WishlistDisplay);
// delete item from wishlist
router.delete("/withlist/delete/:itemId",deleteItemWishList);
module.exports = router;
