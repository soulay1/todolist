export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export type Filter = 'all' | 'active' | 'completed';
