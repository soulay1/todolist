import { Todo } from '../types/todo';

const BASE_URL = 'http://localhost:8080/api/todos';

export const todoApi = {
  async getAll(): Promise<Todo[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Erreur lors du chargement des todos');
    return res.json();
  },

  async create(title: string, description: string): Promise<Todo> {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error('Erreur lors de la création');
    return res.json();
  },

  async toggle(id: number): Promise<Todo> {
    const res = await fetch(`${BASE_URL}/${id}/toggle`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour');
    return res.json();
  },

  async update(id: number, title: string, description: string): Promise<Todo> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, completed: false }),
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour');
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erreur lors de la suppression');
  },

  async deleteCompleted(): Promise<void> {
    const res = await fetch(`${BASE_URL}/completed`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erreur lors de la suppression');
  },
};
