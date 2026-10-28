import { useState } from 'react';

function TaskItem({task, onToggle, onDelete, onUpdate}) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [editedDifficulty, setEditedDifficulty] = useState(task.difficulty);
    const [error, setError] = useState("");

    function handleCancel() {
        setError("");
        setEditedText(task.text);
        setEditedDifficulty(task.difficulty);
        setIsEditing(false);
    }

    function handleSave() {
        const text = editedText.trim();

        if (text === ""){
            setError("Task text cannot be empty");
            return;
        }
        
        setError("");
        onUpdate(task.id, text, editedDifficulty);
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

                    <select
                        value={editedDifficulty}
                        onChange={(event) => setEditedDifficulty(event.target.value)}
                    >
                    <option value="Trivial">Trivial</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Critical">Critical</option>
                    </select>
                 
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