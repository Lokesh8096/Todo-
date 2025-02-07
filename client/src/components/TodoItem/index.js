import React, { useEffect, useState } from "react";
import "./index.css"; // Import CSS file

const TodoItem = ({ isTodoAdded, setIsTodoAdded }) => {
  const [todos, setTodos] = useState([]); // State to store todos
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch todos from the backend using async/await
  const fetchTodos = async () => {
    try {
      const response = await fetch("https://backend-lywh.onrender.com/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [isTodoAdded]);

  // Delete Todo Function
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`https://backend-lywh.onrender.com/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Remove from UI
        setIsTodoAdded(!isTodoAdded);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span className="title"> {todo.title}</span>
              <button
                className="delete-btn"
                type="button"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoItem;
