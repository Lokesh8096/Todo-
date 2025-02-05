import React from "react";
import TodoItem from "../TodoItem";
import "./index.css";

const SimpleTodo = ({ isTodoAdded, setIsTodoAdded }) => {
  return (
    <div className="main-container">
      <h1 className="heading">Simple Todos</h1>
      <TodoItem isTodoAdded={isTodoAdded} setIsTodoAdded={setIsTodoAdded} />
    </div>
  );
};

export default SimpleTodo;