const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.get('/:userId', wishlistController.getWishlist);
router.post('/:userId', wishlistController.addToWishlist);
router.delete('/:userId/:itemId', wishlistController.removeFromWishlist);

module.exports = router;
