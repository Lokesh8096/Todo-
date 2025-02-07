import React, { useState } from "react";
import "./index.css";
import SimpleTodo from "../SimpleTodo";

const AddTodo = () => {
  const [todo, setTodo] = useState(""); // State for the input field
  const [isTodoAdded, setIsTodoAdded] = useState(false);

  // Function to add a new todo
  const addTodo = async () => {
    if (!todo) {
      alert("Please enter a todo!");
      return;
    }

    try {
      const response = await fetch("https://backend-lywh.onrender.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: todo }),
      });

      if (response.ok) {
        setTodo(""); // Clear input field
        setIsTodoAdded(!isTodoAdded);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  //handleChangeInput for set State todo
  function handleChangeInput(e) {
    setTodo(e.target.value);
  }

  return (
    <div className="app-container">
      <div className="simple-todos-container">
        <h1 className="heading">Add your Todos</h1>
        <div className="add-todo-container">
          <input
            className="input-add-todo"
            type="text"
            value={todo}
            placeholder="Enter new todo..."
            onChange={handleChangeInput}
          />
          <button onClick={addTodo} type="button" className="btn-add-todo">
            Add Todo
          </button>
        </div>
        <hr className="hr-tag"/>
      <SimpleTodo isTodoAdded={isTodoAdded} setIsTodoAdded={setIsTodoAdded} />
      </div>
    </div>
  );
};

export default AddTodo;
