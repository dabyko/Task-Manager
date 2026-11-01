const tasks = require("../data/tasks");

const allowedDifficulties = [
    "Trivial",
    "Easy",
    "Medium",
    "Hard",
    "Critical"
];

function getAllTasks(req, res) {
    res.json(tasks);
}

function createTask(req, res) {
    const { title, difficulty } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            error: "Task title must be a non-empty string"
        });
    }

    if (!allowedDifficulties.includes(difficulty)) {
        return res.status(400).json({
            error: "Invalid task difficulty"
        });
    }

    const newTask = {
        id: Date.now(),
        title: title.trim(),
        difficulty,
        completed: false
    }; 

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created successfully",
        task: newTask
    });
}

function updateTask(req, res) {
    const taskId = Number(req.params.id);

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const { completed } = req.body;

    if (typeof completed !== "boolean") {
        return res.status(400).json({
            error: "Completed must be a boolean"
        });
    }

    task.completed = completed;

    res.json({
        message: "Task updated successfully",
        task
    });
}

function deleteTask(req, res) {
    const taskId = Number(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};

