import { useState } from 'react';
import { Todo } from '../types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, description: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, editTitle.trim(), editDescription.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="todo-item todo-item--editing">
        <input
          className="todo-item__edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          autoFocus
        />
        <textarea
          className="todo-item__edit-textarea"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description (optionnel)"
          rows={2}
        />
        <div className="todo-item__edit-actions">
          <button className="btn btn--save" onClick={handleSave}>Sauvegarder</button>
          <button className="btn btn--cancel" onClick={handleCancel}>Annuler</button>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      <button
        className="todo-item__checkbox"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Marquer comme non terminé' : 'Marquer comme terminé'}
      >
        {todo.completed ? '✓' : ''}
      </button>
      <div className="todo-item__content">
        <span className="todo-item__title">{todo.title}</span>
        {todo.description && (
          <span className="todo-item__description">{todo.description}</span>
        )}
      </div>
      <div className="todo-item__actions">
        <button className="btn btn--edit" onClick={() => setIsEditing(true)}>
          Modifier
        </button>
        <button className="btn btn--delete" onClick={() => onDelete(todo.id)}>
          Supprimer
        </button>
      </div>
    </li>
  );
}
