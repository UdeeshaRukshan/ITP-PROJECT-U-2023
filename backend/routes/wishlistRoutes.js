// backend/routes/wishlistRoutes.js

const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Create a new wishlist item
router.post('/', wishlistController.createItem);

// Get all wishlist items
router.get('/', wishlistController.getAllItems);

// Update a wishlist item by ID
router.put('/:id', wishlistController.updateItem);

// Delete a wishlist item by ID
router.delete('/:id', wishlistController.deleteItem);

module.exports = router;
