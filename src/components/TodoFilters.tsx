import React, { useState } from "react";
import api from "../services/api";
import type { Todo } from "../types/Todo";

interface TodoFiltersProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ setTodos }) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [colorFilter, setColorFilter] = useState("");

  const fetchFiltered = async (favorite?: boolean, color?: string) => {
    try {
      const params: any = {};
      if (favorite !== undefined) params.favorite = favorite;
      if (color) params.color = color;

      const res = await api.get<Todo[]>("/todos", { params });
      setTodos(res.data);
    } catch (error) {
      console.error("Erro ao filtrar:", error);
    }
  };

  const handleFavoriteFilter = () => {
    setShowFavorites(!showFavorites);
    fetchFiltered(!showFavorites, colorFilter);
  };

  const handleColorFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    setColorFilter(selectedColor);
    fetchFiltered(showFavorites, selectedColor);
  };

  const clearFilters = () => {
    setShowFavorites(false);
    setColorFilter("");
    fetchFiltered();
  };

  return (
    <div className="filters">
      <button onClick={handleFavoriteFilter}>
        {showFavorites ? "Mostrar todos" : "Somente favoritos"}
      </button>

      <label>
        Filtrar por cor:
        <input type="color" value={colorFilter} onChange={handleColorFilter} />
      </label>

      <button onClick={clearFilters}>Limpar filtros</button>
    </div>
  );
};

export default TodoFilters;
