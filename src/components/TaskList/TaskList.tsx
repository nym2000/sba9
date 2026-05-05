import { useState } from 'react';
import type { Task } from '../../types';
import TaskItem from './TaskItem';
import TaskForm from '../TaskForm/TaskForm';

interface TaskListProps {
    tasks: Task[];
    onAdd: (task: Omit<Task, 'id'>) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: Task['status']) => void;
}

// Maps priority to a number so .sort() can compare them
const priorityOrder: Record<Task['priority'], number> = {
    high: 0,
    medium: 1,
    low: 2,
};

const statusOrder: Record<Task['status'], number> = {
    'todo': 0,
    'in-progress': 1,
    'done': 2,
};

function TaskList({ tasks, onAdd, onDelete, onStatusChange }: TaskListProps) {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'priority' | 'status'>('priority');

    // Filter by search, then sort
    const visibleTasks = tasks
        .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
        .slice() // copy before sorting so we don't mutate the original array
        .sort((a, b) => {
            if (sortBy === 'priority') return priorityOrder[a.priority] - priorityOrder[b.priority];
            return statusOrder[a.status] - statusOrder[b.status];
        });

    return (
        <div>
            {/* Bring task form */}
            <TaskForm onAdd={onAdd} />

            {/* Search and sort controls */}
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

            {/* Empty states */}
            {tasks.length === 0 && (
                <p style={{ color: 'gray', textAlign: 'center' }}>No tasks yet.</p>
            )}
            {tasks.length > 0 && visibleTasks.length === 0 && (
                <p style={{ color: 'gray', textAlign: 'center' }}>No tasks match your search.</p>
            )}

            {/* Task list */}
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