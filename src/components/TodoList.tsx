import React, { useEffect } from "react";
import api from "../services/api";
import type { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get<Todo[]>("/todos");
        setTodos(res.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTodos();
  }, [setTodos]);

  const handleUpdate = (updated: Todo) => {
    setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
