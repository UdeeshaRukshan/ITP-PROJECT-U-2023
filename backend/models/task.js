// server/models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

module.exports = mongoose.model('Task', taskSchema);
