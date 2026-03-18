import { useEffect, useState } from 'react';
import { Todo, Filter } from './types/todo';
import { todoApi } from './api/todoApi';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAll();
      setTodos(data);
      setError(null);
    } catch {
      setError('Impossible de se connecter au serveur. Assurez-vous que le backend est démarré sur le port 8080.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title: string, description: string) => {
    try {
      const newTodo = await todoApi.create(title, description);
      setTodos((prev) => [newTodo, ...prev]);
      setError(null);
    } catch {
      setError('Erreur lors de la création de la tâche.');
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const updated = await todoApi.toggle(id);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError('Erreur lors de la mise à jour.');
    }
  };

  const handleUpdate = async (id: number, title: string, description: string) => {
    try {
      const updated = await todoApi.update(id, title, description);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError('Erreur lors de la mise à jour.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todoApi.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('Erreur lors de la suppression.');
    }
  };

  const handleClearCompleted = async () => {
    try {
      await todoApi.deleteCompleted();
      setTodos((prev) => prev.filter((t) => !t.completed));
    } catch {
      setError('Erreur lors de la suppression.');
    }
  };

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const count = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Todo List</h1>
        <p className="app__subtitle">Gérez vos tâches simplement</p>
      </header>

      <main className="app__main">
        <TodoForm onAdd={handleAdd} />

        {error && (
          <div className="app__error">
            {error}
            <button onClick={loadTodos} className="btn btn--retry">Réessayer</button>
          </div>
        )}

        {loading ? (
          <div className="app__loading">Chargement...</div>
        ) : (
          <>
            {todos.length > 0 && (
              <TodoFilter
                current={filter}
                count={count}
                onFilter={setFilter}
                onClearCompleted={handleClearCompleted}
              />
            )}

            {filtered.length === 0 ? (
              <div className="app__empty">
                {todos.length === 0
                  ? 'Aucune tâche. Ajoutez-en une !'
                  : 'Aucune tâche dans cette catégorie.'}
              </div>
            ) : (
              <ul className="todo-list">
                {filtered.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
