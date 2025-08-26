import React from "react";
import api from "../services/api";
import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updated: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const toggleFavorite = async () => {
    try {
      const res = await api.put<Todo>(`/todos/${todo._id}`, {
        favorite: !todo.favorite,
      });
      onUpdate(res.data);
    } catch (error) {
      console.error("Erro ao favoritar:", error);
    }
  };

  const deleteTodo = async () => {
    try {
      await api.delete(`/todos/${todo._id}`);
      onDelete(todo._id);
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="todo-item" style={{ backgroundColor: todo.color || "#fff" }}>
      <div>
        <h3>
          {todo.title}{" "}
          {todo.favorite && <span style={{ color: "gold" }}>★</span>}
        </h3>
        {todo.description && <p>{todo.description}</p>}
      </div>

      <div className="actions">
        <button onClick={toggleFavorite}>
          {todo.favorite ? "Desfavoritar" : "Favoritar"}
        </button>
        <button onClick={deleteTodo} style={{ color: "red" }}>
          Excluir
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
