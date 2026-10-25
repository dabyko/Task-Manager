import { useState } from 'react';

function TaskItem({task, onToggle, onDelete, onUpdate}) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);

    return (
        <li>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />

            {
                isEditing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={(event) => setEditedText(event.target.value)}
                />
                ) : (
                <span className={task.completed ? "completed" : ""}>
                    {task.text}
                </span>)
            }

            {isEditing ? (
            <>
            <button
                onClick={() => {
                const text = editedText.trim();

                if (text === "") return;

                onUpdate(task.id, text);
                setIsEditing(false);
                }}
                >
                Save
            </button>

            <button
                onClick={() => {
                setEditedText(task.text);
                setIsEditing(false);
                }}
                >
                Cancel
            </button>
            </>
            ) : (
            <>
            <button onClick={() => setIsEditing(true)}>
                Edit
            </button>

            <button onClick={() => onDelete(task.id)}>
                Delete
            </button>
            </>
            )}       
        </li>
    );
}

export default TaskItem;