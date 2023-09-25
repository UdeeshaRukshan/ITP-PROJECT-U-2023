// server/controllers/itemController.js
const Item = require('../models/Item');

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new item
const addItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem = new Item({ name, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndRemove(id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
