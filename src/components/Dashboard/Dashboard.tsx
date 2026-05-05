import { useState } from 'react';
import type { Task } from '../../types';
import TaskList from '../TaskList/TaskList';
import TaskForm from '../TaskForm/TaskForm';

//hardcoding tasks for now
const initialTasks: Task[] = [
  { id: 1, title: 'Title A', description: 'Description A', status: 'in-progress', priority: 'high' },
  { id: 2, title: 'Title B', description: 'Description B', status: 'todo', priority: 'medium' },
  { id: 3, title: 'Title C', description: 'Description C', status: 'todo', priority: 'low' },
];

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
 
  const handleStatusChange = (id: number, status: Task['status']) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };
 
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: 'sans-serif',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Task Dashboard</h1>
 
      <TaskForm />
 
      {/* Search and sort controls will go here */}
       <TaskList
        tasks={tasks}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
 
export default Dashboard;
