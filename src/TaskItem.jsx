import { useState } from 'react';

function TaskItem({task, tags, onToggle, onDelete, onUpdate}) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [editedDifficulty, setEditedDifficulty] = useState(task.difficulty);
    const [error, setError] = useState("");
    const [editedTagId, setEditedTagId] = useState(task.tagId);

    function handleCancel() {
        setError("");
        setEditedText(task.text);
        setEditedDifficulty(task.difficulty);
        setEditedTagId(task.tagId);
        setIsEditing(false);
    }

    function handleSave() {
        const text = editedText.trim();

        if (text === ""){
            setError("Task text cannot be empty");
            return;
        }
        
        setError("");
        onUpdate(task.id, text, editedDifficulty, editedTagId);
        setIsEditing(false);
    }

    const tag = tags.find((tag) => tag.id === task.tagId);

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

                    <select
                        value={editedTagId}
                        onChange={(event) => setEditedTagId(Number(event.target.value))}
                    >
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                            {tag.name}
                            </option>
                        ))}
                    </select>

                    <span className={`task-difficulty ${editedDifficulty.toLowerCase()}`}>
                        {editedDifficulty}
                    </span>
                 
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

                    {tag && (
                        <span className="task-tag">
                            {tag.name}
                        </span>
                    )}
                </>
                )

                
            }

            {isEditing ? (
            
                <div className="task-actions">
                    <button className="task-button save-button" onClick={handleSave}>
                        Save
                    </button>

                    <button className="task-button cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            
            ) : (
            
                <div className="task-actions">
                    <button className="task-button edit-button" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>

                    <button className="task-button delete-button" onClick={() => onDelete(task.id)}>
                        Delete
                    </button>
                </div>
            )}       
        </li>
    );
}

export default TaskItem;