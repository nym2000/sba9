import { useState } from 'react';
import type { Task } from '../../types';

interface TaskFormProps {
  onAdd: (task: Omit<Task, 'id'>) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    onAdd({ title: title.trim(), description: description.trim(), priority, status: 'todo' });

    // Reset
    setTitle('');
    setDescription('');
    setPriority('medium');
    setError('');
  };

  return (
    <div style={{
      border: '1px solid lightgray',
      borderRadius: '6px',
      padding: '16px',
      marginBottom: '24px',
      backgroundColor: 'whitesmoke',
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

        <div style={{ marginBottom: '16px' }}>
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
      </form>
    </div>
  );
}

export default TaskForm;