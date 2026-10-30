const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is healthy"
    });
});

const allowedDifficulties = [
    "Trivial",
    "Easy",
    "Medium",
    "Hard",
    "Critical"
];

app.post("/api/tasks", (req, res) => {
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

    res.json({
        message: "Task received successfully",
        task: {
            title,
            difficulty
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});