// server/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Define item routes (GET, POST, PUT, DELETE)
router.get('/', itemController.getItems);
router.post('/', itemController.addItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
