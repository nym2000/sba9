import type { FilterOptions } from '../../types';

interface TaskFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

// Label for active filter indicator
const statusLabels: Record<string, string> = {
  all: 'All Statuses',
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

const priorityLabels: Record<string, string> = {
  all: 'All Priorities',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

function TaskFilter({ filters, onFilterChange }: TaskFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  // Determine filter active status
  const activeFilters = [
    filters.status !== 'all' && `Status: ${statusLabels[filters.status]}`,
    filters.priority !== 'all' && `Priority: ${priorityLabels[filters.priority]}`,
  ].filter(Boolean) as string[];

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        padding: '12px',
        backgroundColor: 'whitesmoke',
        borderRadius: '6px',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '14px', color: 'gray' }}>Filter:</span>

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          style={{ padding: '6px', borderRadius: '4px', border: '1px solid lightgray' }}
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          style={{ padding: '6px', borderRadius: '4px', border: '1px solid lightgray' }}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Clear button to be only shown when at least one filter is active */}
        {activeFilters.length > 0 && (
          <button
            onClick={() => onFilterChange({ status: 'all', priority: 'all'})}
            style={{
              padding: '4px 10px',
              border: '1px solid lightgray',
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Active filter indicators */}
      {activeFilters.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
          {activeFilters.map((label) => (
            <span
              key={label}
              style={{
                padding: '2px 10px',
                backgroundColor: 'steelblue',
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskFilter;