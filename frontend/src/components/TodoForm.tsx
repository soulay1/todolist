import { useState, FormEvent } from 'react';

interface Props {
  onAdd: (title: string, description: string) => void;
}

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim());
    setTitle('');
    setDescription('');
    setExpanded(false);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__row">
        <input
          type="text"
          className="todo-form__input"
          placeholder="Ajouter une tâche..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
        />
        <button type="submit" className="todo-form__btn" disabled={!title.trim()}>
          Ajouter
        </button>
      </div>
      {expanded && (
        <textarea
          className="todo-form__textarea"
          placeholder="Description (optionnel)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      )}
    </form>
  );
}
