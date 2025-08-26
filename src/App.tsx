import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import type { Todo } from "./types/Todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  return (
    <div className="container">
      <h1>Minha To-Do List</h1>
      <TodoForm onAdd={handleAddTodo} />
      <TodoFilters setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
