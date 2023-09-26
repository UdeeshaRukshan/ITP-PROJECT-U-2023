const Item = require('../models/Item');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch items' });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  const { name, description } = req.body;
  const newItem = new Item({ name, description });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create item' });
  }
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch item' });
  }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
  const itemId = req.params.itemId;
  const { name, description } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, { name, description }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Unable to update item' });
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const deletedItem = await Item.findByIdAndRemove(itemId);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete item' });
  }
};
