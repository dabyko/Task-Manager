const tasks = require("../data/tasks");

const allowedDifficulties = [
    "Trivial",
    "Easy",
    "Medium",
    "Hard",
    "Critical"
];

function getAllTasks() {
    return tasks;
}

function createTask(title, difficulty) {
    if (typeof title !== "string" || title.trim() === "") {
        throw new Error("Task title must be a non-empty string");
    }

    if (!allowedDifficulties.includes(difficulty)) {
        throw new Error("Invalid task difficulty");
    }

    const newTask = {
        id: Date.now(),
        title: title.trim(),
        difficulty,
        completed: false
    }; 

    tasks.push(newTask);

    return newTask;
}

function updateTask(taskId, completed) {
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    if (typeof completed !== "boolean") {
        throw new Error("Completed must be a boolean");
    }

    task.completed = completed;

    return task;
}

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        throw new Error("Task not found");
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    return deletedTask[0];
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};