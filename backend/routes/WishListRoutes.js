const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Get the user's wishlist
router.get('/wishlist', wishlistController.getWishlist);

// Add an item to the wishlist
router.post('/wishlist/addItem', wishlistController.addToWishlist);

// Remove an item from the wishlist
router.delete('/wishlist/removeItem/:itemId', wishlistController.removeFromWishlist);

module.exports = router;
