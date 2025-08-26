// Modelo de Tarefa (compartilhado no projeto)
export interface Todo {
  _id: string;
  title: string;
  description?: string;
  color?: string;
  favorite: boolean;
  createdAt: string;
}
