const router = require("express").Router();

const {
  WishlistAdd,
  WishlistDisplay,
} = require("../Controllers/WishlistController");

router.post("/add", WishlistAdd);
router.get("/display", WishlistDisplay);

module.exports = router;
