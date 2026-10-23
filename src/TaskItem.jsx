function TaskItem({task, onToggle}) {
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
    </li>
  );
}

export default TaskItem;