export interface Todo {
  _id: string;
  title: string;
  description?: string;
  color?: string;
  isFavorite: boolean;
  createdAt?: string;
  updatedAt?: string;
}
