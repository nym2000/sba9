import { useState, useEffect } from 'react';
import type { Task, FilterOptions } from '../../types';
import { filterTasks, saveTasks, loadTasks } from '../../utils/taskUtils';
import TaskList from '../TaskList/TaskList';

function Dashboard() {
  // Loads existing tasks
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filters, setFilters] = useState<FilterOptions>({ status: 'all', priority: 'all' });

  // Save to localStorage every time tasks changes
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAdd = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = { ...newTaskData, id: Date.now() };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id: number, status: Task['status']) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const filteredTasks = filterTasks(tasks, filters);

  const statusStats = [
    { label: 'To Do',       value: tasks.filter((t) => t.status === 'todo').length,        color: 'steelblue' },
    { label: 'In Progress', value: tasks.filter((t) => t.status === 'in-progress').length,  color: 'darkorange' },
    { label: 'Done',        value: tasks.filter((t) => t.status === 'done').length,         color: 'seagreen' },
  ];

  const priorityStats = [
    { label: 'High',   value: tasks.filter((t) => t.priority === 'high').length,   color: 'crimson' },
    { label: 'Medium', value: tasks.filter((t) => t.priority === 'medium').length,  color: 'darkorange' },
    { label: 'Low',    value: tasks.filter((t) => t.priority === 'low').length,     color: 'steelblue' },
  ];

  const statCard = (label: string, value: number, color: string) => (
    <div
      key={label}
      style={{
        flex: '1',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '6px',
        border: `2px solid ${color}`,
      }}
    >
      <div style={{ fontSize: '22px', fontWeight: 'bold', color }}>{value}</div>
      <div style={{ fontSize: '12px', color: 'gray' }}>{label}</div>
    </div>
  );

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: 'sans-serif',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Task Dashboard</h1>

      <div style={{
        border: '1px solid lightgray',
        borderRadius: '6px',
        padding: '16px',
        marginBottom: '24px',
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: 'gray', fontSize: '13px', textTransform: 'uppercase' }}>
          Status
        </p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          {statusStats.map((s) => statCard(s.label, s.value, s.color))}
        </div>

        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: 'gray', fontSize: '13px', textTransform: 'uppercase' }}>
          Priority
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          {priorityStats.map((s) => statCard(s.label, s.value, s.color))}
        </div>
      </div>

      <TaskList
        tasks={filteredTasks}
        filters={filters}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onFilterChange={setFilters}
      />
    </div>
  );
}

export default Dashboard;