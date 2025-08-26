import React, { useState } from "react";
import api from "../services/api";
import type { Todo } from "../types/Todo";

interface TodoFormProps {
  onAdd: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("O título é obrigatório!");
      return;
    }

    try {
      const res = await api.post<Todo>("/todos", {
        title,
        description,
        color,
      });

      onAdd(res.data);
      setTitle("");
      setDescription("");
      setColor("#ffffff");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Erro ao criar tarefa.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>
        Cor:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>

      <button type="submit">Adicionar</button>
    </form>
  );
};

export default TodoForm;
