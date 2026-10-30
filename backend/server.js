const express = require("express");

const app = express();

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});