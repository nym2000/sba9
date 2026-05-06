import type { Task, FilterOptions } from '../types';

export function filterTasks(tasks: Task[], filters: FilterOptions): Task[] {
  return tasks.filter((task) => {
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    return matchesStatus && matchesPriority;
  });
}

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

export function sortTasks(tasks: Task[], sortBy: 'priority' | 'status'): Task[] {
  return tasks.slice().sort((a, b) => {
    if (sortBy === 'priority') return priorityOrder[a.priority] - priorityOrder[b.priority];
    return statusOrder[a.status] - statusOrder[b.status];
  });
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasks(): Task[] {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}