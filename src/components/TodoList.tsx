import React from "react";
import type { Todo } from "../types/Todo";
import TodoCard from "./TodoCard";

interface Props {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, onUpdate, onDelete }) => {
  const favorites = todos.filter(t => t.isFavorite);
  const others = todos.filter(t => !t.isFavorite);

  return (
    <>
      <section className="block">
        <h2>Favorites</h2>
        <div className="todos-grid">
          {favorites.map(t => (
            <TodoCard key={t._id} todo={t} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </div>
      </section>

      <section className="block">
        <h2>Others</h2>
        <div className="todos-grid">
          {others.map(t => (
            <TodoCard key={t._id} todo={t} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </div>
      </section>
    </>
  );
};

export default TodoList;
