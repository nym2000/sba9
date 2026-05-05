import type { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: number, status: Task['status']) => void;
}

function TaskItem({ task, onStatusChange }: TaskItemProps) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}

export default TaskItem;