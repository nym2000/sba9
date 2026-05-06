import { useState } from 'react';
import type { Task } from '../../types';

interface TaskFormProps {
  onAdd: (task: Omit<Task, 'id'>) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [status, setStatus] = useState<Task['status']>('todo');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required.');
      setSuccessMessage('');
      return;
    }

    onAdd({ title: title.trim(), description: description.trim(), priority, status });

    // Reset
    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus('todo');
    setError('');
    setSuccessMessage('Task added!');
  };

  return (
    <div style={{
      border: '1px solid lightgray',
      borderRadius: '6px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h2 style={{ marginTop: 0 }}>Add Task</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '4px' }}>Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid lightgray', boxSizing: 'border-box' }}
          />
          {error && <p style={{ color: 'crimson', margin: '4px 0 0', fontSize: '13px' }}>{error}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '4px' }}>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            rows={2}
            style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid lightgray', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div>
            <label htmlFor="priority" style={{ display: 'block', marginBottom: '4px' }}>Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task['priority'])}
              style={{ padding: '6px', borderRadius: '4px', border: '1px solid lightgray' }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" style={{ display: 'block', marginBottom: '4px' }}>Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Task['status'])}
              style={{ padding: '6px', borderRadius: '4px', border: '1px solid lightgray' }}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="submit"
            style={{
              padding: '8px 20px',
              backgroundColor: 'steelblue',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add Task
          </button>

          {successMessage && (
            <p style={{ margin: 0, color: 'green', fontSize: '14px' }}>{successMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;