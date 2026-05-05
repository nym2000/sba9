import type { Task } from '../../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: number, status: Task['status']) => void;
}

function TaskList({ tasks, onStatusChange }: TaskListProps) {
  if (tasks.length === 0) {
    return <p style={{ color: 'gray', textAlign: 'center' }}>No tasks yet.</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;