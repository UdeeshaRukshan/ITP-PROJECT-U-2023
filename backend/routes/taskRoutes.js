// server/routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Create a new task
router.post("/task", createTask);

// Get all tasks
router.get("/gettask", getTasks);

// Update a task
router.put("/tasksupdate/:id", updateTask);

// Delete a task
router.delete("/tasksdelete/:id", deleteTask);

module.exports = router;
