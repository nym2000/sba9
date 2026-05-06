import { useState } from 'react';
import type { Task, FilterOptions } from '../../types';
import { sortTasks } from '../../utils/taskUtils';
import TaskItem from './TaskItem';
import TaskForm from '../TaskForm/TaskForm';
import TaskFilter from '../TaskFilter/TaskFilter';

interface TaskListProps {
  tasks: Task[];
  filters: FilterOptions;
  onAdd: (task: Omit<Task, 'id'>) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task['status']) => void;
  onFilterChange: (filters: FilterOptions) => void;
}

function TaskList({ tasks, filters, onAdd, onDelete, onStatusChange, onFilterChange }: TaskListProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'status'>('priority');

  const visibleTasks = sortTasks(
    tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase())),
    sortBy
  );

  return (
    <div>
      <TaskForm onAdd={onAdd} />

      {/* Search and sort */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          style={{
            flex: '1',
            minWidth: '150px',
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid lightgray',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label htmlFor="sortBy" style={{ fontSize: '14px', color: 'gray' }}>Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'priority' | 'status')}
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid lightgray' }}
          >
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Filter sits just above the task list */}
      <TaskFilter filters={filters} onFilterChange={onFilterChange} />

      {/* Empty states */}
      {tasks.length === 0 && (
        <p style={{ color: 'gray', textAlign: 'center' }}>No tasks yet.</p>
      )}
      {tasks.length > 0 && visibleTasks.length === 0 && (
        <p style={{ color: 'gray', textAlign: 'center' }}>No tasks match your search.</p>
      )}

      {visibleTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;