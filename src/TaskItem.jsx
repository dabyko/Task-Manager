import { useState } from 'react';

// TaskItem receives the task data, available tags, and callback functions from App
function TaskItem({task, tags, onToggle, onDelete, onUpdate}) {

    //Controls whether the task is currently in editing mode
    const [isEditing, setIsEditing] = useState(false);
    //Stores the edited task title
    const [editedText, setEditedText] = useState(task.text);
    //Stores the edited task difficulty
    const [editedDifficulty, setEditedDifficulty] = useState(task.difficulty);
    //Stores the ID of the selected tag
    const [editedTagId, setEditedTagId] = useState(task.tagId);
    //Stores the edited comment. Uses an empty string if no comment exists
    const [editedComment, setEditedComment] = useState(task.comment || "");
    //Stores validation error messages
    const [error, setError] = useState("");

    //Resets the editing fields and exits editing mode without saving changes
    function handleCancel() {
        setError("");
        setEditedText(task.text);
        setEditedDifficulty(task.difficulty);
        setEditedTagId(task.tagId);
        setIsEditing(false);
    }

    //Validates and saves the edited task
    function handleSave() {
        const text = editedText.trim();

        //Prevents saving a task with an empty title
        if (text === ""){
            setError("Task text cannot be empty");
            return;
        }
        setError("");

        //Sends the updated values to the parent component
        onUpdate(task.id, text, editedDifficulty, editedTagId,  editedComment.trim());
        
        //Exits editing mode after saving
        setIsEditing(false);
    }

    //Finds the tag associated with the current task
    const tag = tags.find((tag) => tag.id === task.tagId);

    return (
        <li>
            {/* Checkbox for changing the task completion status. */}
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />

            {
                // Displays the editing form or the regular task information
                isEditing ? (
                <>
                    {/* Input for editing the task title. */}
                    <input
                        type="text"
                        value={editedText}
                        onChange={(event) => {
                            setEditedText(event.target.value);
                            setError("");
                        }}
                    />

                    {/* Input for editing the optional task comment. */}
                    <input
                        type="text"
                        value={editedComment}
                        onChange={(event) => setEditedComment(event.target.value)}
                        placeholder="Add a comment (optional)"
                    />

                    {/* Dropdown for selecting the task difficulty. */}
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

                    {/* Dropdown for selecting a task tag. */}
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

                    {/* Displays the currently selected difficulty. */}
                    <span className={`task-difficulty ${editedDifficulty.toLowerCase()}`}>
                        {editedDifficulty}
                    </span>
                 
                    {/* Displays a validation error when one exists. */}
                    {error && <p className="error-message">{error}</p>}
                </>
                ) : (
                <>
                    {/* Displays the task title and applies a class if completed. */}
                    <span className={task.completed ? "completed" : ""}>
                        {task.text}
                    </span>

                    {/* Displays the task difficulty with a corresponding CSS class. */}
                    <span className={`task-difficulty ${task.difficulty.toLowerCase()}`}>
                        {task.difficulty}
                    </span>

                    {/* Displays the tag only if it exists. */}
                    {tag && (
                        <span className="task-tag">
                            {tag.name}
                        </span>
                    )}

                    {/* Displays the comment only if it is not empty. */}
                    {task.comment && (
                        <span className="task-comment">
                        {task.comment}
                        </span>
                    )}
                </>
                )

                
            }

            {/* Displays Save and Cancel buttons in editing mode. */}
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
                /* Displays Edit and Delete buttons in regular mode. */
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