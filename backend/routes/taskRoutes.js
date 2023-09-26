// server/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/tasks', taskController.createTask);

// Get all tasks
router.get('/tasks', taskController.getTasks);

// Update a task
router.put('/tasks/:id', taskController.updateTask);

// Delete a task
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
