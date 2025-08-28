import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import type { Todo } from "./types/Todo";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get<Todo[]>("/api/todos").then((r) => setTodos(r.data));
  }, []);

  const addTodo = async (data: { title: string; description?: string; color?: string }) => {
    const res = await api.post<Todo>("/api/todos", data);
    setTodos((prev) => [res.data, ...prev]);
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    console.log("[updateTodo] id:", id, "updates:", updates);

    const snapshot = todos;
    setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, ...updates } : t)));

    try {
      await api.put(`/api/todos/${id}`, updates); 
    } catch (err) {
      console.error("Falha ao atualizar todo:", err);
      try {
        const r = await api.get<Todo[]>("/api/todos");
        setTodos(r.data);
      } catch {
        setTodos(snapshot);
      }
    }
  };

  const deleteTodo = async (id: string) => {
    const snapshot = todos;
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.delete(`/api/todos/${id}`);
    } catch (err) {
      console.error("Falha ao deletar todo:", err);
      setTodos(snapshot);
    }
  };

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return todos;
    return todos.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
    );
  }, [todos, search]);

  

  return (
    <div className="container">
      <Header search={search} onSearch={setSearch} />
      <TodoForm onAdd={addTodo} />
      <TodoList todos={visible} onUpdate={updateTodo} onDelete={deleteTodo} />
    </div>
  );
};

export default App;
