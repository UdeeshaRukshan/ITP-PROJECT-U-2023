// backend/routes/wishlistRoutes.js

const express = require("express");
const router = express.Router();
const {
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
} = require("../controllers/wishlistController");

// Create a new wishlist item
router.post("/create", createItem);

// Get all wishlist items
router.get("/getitem", getAllItems);

// Update a wishlist item by ID
router.put("/update/:id", updateItem);

// Delete a wishlist item by ID
router.delete("/delete/:id", deleteItem);

module.exports = router;
