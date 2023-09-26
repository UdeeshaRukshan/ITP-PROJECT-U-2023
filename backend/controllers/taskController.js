// server/controllers/taskController.js
const Task = require('../models/task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create task' });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch tasks' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      completed,
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete task' });
  }
};
