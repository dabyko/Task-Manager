import { useState, useRef } from 'react';
import './App.css'
import TaskItem from './TaskItem';


function App() {
  // Stores the text entered by the user when creating a task
  const [taskText, setTaskText] = useState("");
  // Stores all tasks in the application
  const [tasks, setTasks] = useState([]);
  // Provides direct access to the task input element (e.g. to focus it)
  const taskInputRef = useRef(null);
  // Stores the selected difficulty for a new task
  const [taskDifficulty, setTaskDifficulty] = useState("Trivial");
  // Stores the list of tags available for tasks
  const [tags, setTags] = useState([
    { id: 1, name: "Study" },
    { id: 2, name: "Work" },
    { id: 3, name: "Sport" }
  ]);
  // Stores the optional comment entered when creating a task
  const [taskComment, setTaskComment] = useState("");
  // Stores the ID of the tag selected for a new task
  const [taskTag, setTaskTag] = useState(1);
  
  // Creates a new task and adds it to the tasks array
  function handleAddTask() {

    if (taskText.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      completed: false,
      difficulty: taskDifficulty,
      tagId: taskTag,
      comment: taskComment.trim()
    };
    // Adds the new task without mutating the previous state array
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Clears the input fields after successful task creation
    setTaskText("");
    setTaskComment("");

    // Automatically returns focus to the task title input
    taskInputRef.current.focus();
  }

  // Toggles the completion status of a task
  function handleToggleTask(id) {
    setTasks((prevTasks) =>
    prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }

  // Deletes a task from the tasks array using its ID
  function handleDeleteTask(id) {
      setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

   // Updates the editable properties of an existing task
  function handleUpdateTask(id, newText, newDifficulty, newTagId, newComment) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { 
            ...task, 
            text: newText,
            difficulty: newDifficulty,
            tagId: newTagId,
            comment: newComment
          }
          : task
        )
    );
  }

  // Calculates the number of completed tasks
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className='app'> 

      <header className='header'>
        <h1>Task Manager</h1>
        <p>Make every day count</p>
      </header>

      <main className='main'>

        {/* Displays task statistics */}
        <section className='stats'>
          <div className='stat-card'>
            <p>Total Tasks</p>
            <h3>{tasks.length}</h3>
          </div>
          <div className='stat-card'>
            <p>Completed</p>
            <h3>{completedTasks}</h3>
          </div>
        </section>

        <section className='tasks-section'>
          <h2>My Tasks</h2>
          <p>Manage your daily tasks</p>

          {/* Form for creating new tasks */}
          <form className='task-form' onSubmit={(event)=>{event.preventDefault(); handleAddTask();}}>
            
             {/* Task title input */}
            <input
              ref={taskInputRef}
              type="text" 
              placeholder='What needs to be done?'  
              value={taskText} 
              onChange={(event)=> setTaskText(event.target.value)}
            />
            
             {/* Optional task comment */}
            <input
              type="text"
              value={taskComment}
              onChange={(event) => setTaskComment(event.target.value)}
              placeholder="Add a comment (optional)"
            />

             {/* Task difficulty selector */}
            <select
              value={taskDifficulty}
              onChange={(event) => setTaskDifficulty(event.target.value)}
            >
            <option value="Trivial">Trivial</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Critical">Critical</option>
            </select>

             {/* Task tag selector */}  
            <select
              value={taskTag}
              onChange={(event) => setTaskTag(Number(event.target.value))}
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>

            <button type='submit'>Add Task</button>
          </form>
          
          {/* Renders the list of tasks */}
          <ul className="task-list">
            {
              tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                tags={tags}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))}
          </ul>

        </section>
      </main>
    </div>
  );
}

export default App
