const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors"); // Import CORS package

const app = express(); // Initializing Express app

const dbPath = path.join(__dirname, "simpleTodos.db"); // Path to SQLite database

let db = null; // Database connection variable

// Middleware to enable JSON parsing
app.use(express.json());

// Enable CORS for frontend communication
app.use(cors()); // Allows requests from frontend

// Function to initialize the database and start the server
const initializeDBAndServer = async () => {
  try {
    // Open a connection to the SQLite database
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Start the Express server on port 4000
    app.listen(4000, () => {
      console.log("Server Running at http://localhost:4000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`); // Log any database connection errors
    process.exit(1); // Exit the process if there is a database connection failure
  }
};

initializeDBAndServer(); // Call function to initialize DB and server

// API to add a new todo
app.post("/todos", async (req, res) => {
  try {
    const { title } = req.body; // Get the title from request body
    if (!title) {
      res.status(400);
      res.send({ error: "Title is required" });
    }

    const addTodoQuery = `
      INSERT INTO todos (title) VALUES ('${title}');
    `;
    await db.run(addTodoQuery); // Execute query
    res.status(201);
    res.send({ message: "Todo added successfully" });
  } catch (error) {
    res.status(500);
    res.send({ error: "Error adding todo" });
  }
});

// API to fetch all todos from the database
app.get("/todos", async (req, res) => {
  try {
    const getTodosQuery = `SELECT * FROM todos;`; // SQL query to get all todos
    const todos = await db.all(getTodosQuery); // Execute query and fetch results
    res.send(todos); // Send todos as a response
  } catch (error) {
    res.status(500);
    res.send({ error: "Error fetching todos" }); // Handle errors
  }
});

// Delete Todo API
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the id from request params

    const deleteTodoQuery = `DELETE FROM todos WHERE id = ${id};`;
    await db.run(deleteTodoQuery);

    res.send("Todo deleted successfully");
  } catch (error) {
    res.status(500);
    res.send("Error deleting todo");
  }
});