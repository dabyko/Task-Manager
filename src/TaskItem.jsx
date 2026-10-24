function TaskItem({task, onToggle, onDelete}) {
  return (
    <li>
        <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
        />

        <span className={task.completed ? "completed" : ""}>
            {task.text}
        </span>

        <button onClick={() => onDelete(task.id)}>
            Delete
        </button>
    </li>
  );
}

export default TaskItem;