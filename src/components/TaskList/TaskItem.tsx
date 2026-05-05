import type { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: number, status: Task['status']) => void;
}

const priorityColors: Record<Task['priority'], string> = {
  high: 'crimson',
  medium: 'darkorange',
  low: 'steelblue',
};

function TaskItem({ task, onStatusChange }: TaskItemProps) {
  return (
    <div style={{
      border: '1px solid lightgray',
      borderRadius: '6px',
      padding: '12px',
      marginBottom: '10px',
      backgroundColor: 'white',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{task.title}</h3>
        <span style={{
          color: priorityColors[task.priority],
          fontWeight: 'bold',
          fontSize: '13px',
          textTransform: 'uppercase',
        }}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p style={{ margin: '8px 0', color: 'gray', fontSize: '14px' }}>
          {task.description}
        </p>
      )}

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
        style={{ marginTop: '8px', padding: '4px', borderRadius: '4px', border: '1px solid lightgray' }}
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}

export default TaskItem;