// Import Express to create and configure the backend server
const express = require("express");
// Import task routes from the routes folder
const taskRoutes = require("./routes/tasks");

// Create an Express application
const app = express();

// Define the port on which the server will listen
const PORT = 3000;
// Middleware that allows the server to receive and parse JSON request bodies
app.use(express.json());
// Register task routes under the /api/tasks URL prefix
app.use("/api/tasks", taskRoutes);
// Define the root endpoint to check if the server is running
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Start the server and display its URL in the console
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});