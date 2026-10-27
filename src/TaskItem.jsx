import { useState } from 'react';

function TaskItem({task, onToggle, onDelete, onUpdate}) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [error, setError] = useState("");

    function handleCancel() {
        setError("");
        setEditedText(task.text);
        setIsEditing(false);
    }

    function handleSave() {
        const text = editedText.trim();

        if (text === ""){
            setError("Task text cannot be empty");
            return;
        }
        
        setError("");
        onUpdate(task.id, text);
        setIsEditing(false);
    }

    return (
        <li>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />

            {
                isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(event) => {
                            setEditedText(event.target.value);
                            setError("");
                        }}
                    />
                 
                    {error && <p className="error-message">{error}</p>}
                </>
                ) : (
                <>
                <span className={task.completed ? "completed" : ""}>
                    {task.text}
                </span>

                <span className={`task-difficulty ${task.difficulty.toLowerCase()}`}>
                    {task.difficulty}
                </span>
                </>
                )

                
            }

            {isEditing ? (
            <>
            <button onClick={handleSave}>
                Save
            </button>

            <button onClick={handleCancel}>
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