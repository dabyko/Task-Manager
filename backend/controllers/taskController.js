const { getAllTasks: getAllTasksService,
        createTask: createTaskService,
        updateTask: updateTaskService,
        deleteTask: deleteTaskService
} = require("../services/taskService");


function getAllTasks(req, res) {
    res.json(getAllTasksService());
}

function createTask(req, res) {
    const { title, difficulty } = req.body;

    try {
        const newTask = createTaskService(title, difficulty);

        res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

function updateTask(req, res) {
    const taskId = Number(req.params.id);
    const { completed } = req.body;

    try {
        const updatedTask = updateTaskService(taskId, completed);

        res.json({
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (error) {
        const statusCode = error.message === "Task not found" ? 404 : 400;

        res.status(statusCode).json({
            error: error.message
        });
    }
}

function deleteTask(req, res) {
    const taskId = Number(req.params.id);

    try {
        const deletedTask = deleteTaskService(taskId);

        res.json({
            message: "Task deleted successfully",
            task: deletedTask
        });
    } catch (error) {
        const statusCode = error.message === "Task not found" ? 404 : 400;

        res.status(statusCode).json({
            error: error.message
        });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};

