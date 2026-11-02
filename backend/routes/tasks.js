// Import Express to create the router
const express = require("express");
// Create a separate router for task-related endpoints
const router = express.Router();

const { getAllTasks, createTask, updateTask,  deleteTask } = require("../controllers/taskController");

router.get("/", getAllTasks);

router.post("/", createTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

// Export the router so it can be used in server.js
module.exports = router;