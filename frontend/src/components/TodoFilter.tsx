import { Filter } from '../types/todo';

interface Props {
  current: Filter;
  count: { all: number; active: number; completed: number };
  onFilter: (f: Filter) => void;
  onClearCompleted: () => void;
}

export function TodoFilter({ current, count, onFilter, onClearCompleted }: Props) {
  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: `Toutes (${count.all})` },
    { key: 'active', label: `Actives (${count.active})` },
    { key: 'completed', label: `Terminées (${count.completed})` },
  ];

  return (
    <div className="todo-filter">
      <div className="todo-filter__tabs">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            className={`todo-filter__tab ${current === key ? 'todo-filter__tab--active' : ''}`}
            onClick={() => onFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>
      {count.completed > 0 && (
        <button className="todo-filter__clear" onClick={onClearCompleted}>
          Supprimer les terminées
        </button>
      )}
    </div>
  );
}
