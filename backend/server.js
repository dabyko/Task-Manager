const express = require("express");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});