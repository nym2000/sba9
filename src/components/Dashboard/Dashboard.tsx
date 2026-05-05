import { useState } from 'react';
import type { Task } from '../../types';
import TaskList from '../TaskList/TaskList';

//hardcoding tasks for now
const initialTasks: Task[] = [
    { id: 1, title: 'Title A', description: 'Description A', status: 'in-progress', priority: 'high' },
    { id: 2, title: 'Title B', description: 'Description B', status: 'todo', priority: 'medium' },
    { id: 3, title: 'Title C', description: 'Description C', status: 'todo', priority: 'low' },
];

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

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

    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '24px',
            fontFamily: 'sans-serif',
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Task Dashboard</h1>

            <TaskList
                tasks={tasks}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}

export default Dashboard;