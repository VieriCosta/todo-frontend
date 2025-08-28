import React, { useState } from "react";
import type { Todo } from "../types/Todo";

interface Props {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

const Star = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const StarFilled = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Trash = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const TodoCard: React.FC<Props> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [color, setColor] = useState(todo.color || "#f9f9f9");

  const handleCardClick = () => {
    if (!isEditing) setIsEditing(true);
  };

  const saveChanges = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onUpdate(todo._id, { title, description, color });
    setIsEditing(false);
  };

  const cancelEdit = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTitle(todo.title);
    setDescription(todo.description || "");
    setColor(todo.color || "#f9f9f9");
    setIsEditing(false);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(todo._id, { isFavorite: !todo.isFavorite });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(todo._id);
  };

  return (
    <div
      className="todo-card"
      style={{ background: color }}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <button
        className={`star-btn ${todo.isFavorite ? "on" : ""}`}
        onClick={toggleFavorite}
        aria-label={todo.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        title={todo.isFavorite ? "Favorito" : "Marcar como favorito"}
      >
        {todo.isFavorite ? <StarFilled /> : <Star />}
      </button>

      {isEditing ? (
        // conteúdo de edição (mantido)
        <div className="edit-wrap" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            value={title}
            className="edit-input"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
          />

          <textarea
            className="edit-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
          />

          <label className="color-picker-label">
            🎨 Cor:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-picker"
            />
          </label>

          <div className="actions">
            <button className="btn cancel" onClick={cancelEdit}>
              Cancel
            </button>
            <button className="btn save" onClick={saveChanges}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && <p className="todo-desc">{todo.description}</p>}

          <div className="actions">
            {/* Lixeira mantida */}
            <button
              className="icon-btn trash"
              onClick={handleDelete}
              aria-label="Excluir tarefa"
              title="Excluir"
            >
              <Trash />
            </button>

            
          </div>
        </>
      )}
    </div>
  );
};

export default TodoCard;
