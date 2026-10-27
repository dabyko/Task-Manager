import { useState, useRef } from 'react';
import './App.css'
import TaskItem from './TaskItem';


function App() {

  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const taskInputRef = useRef(null);
  
  function handleAddTask() {

    if (taskText.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      completed: false
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskText("");
    taskInputRef.current.focus();
  }

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

  function handleDeleteTask(id) {
      setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

  function handleUpdateTask(id, newText) {
    setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === id
        ? { ...task, text: newText }
        : task
    )
    );
  }

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className='app'> 
      <header className='header'>
        <h1>Task Manager</h1>
        <p>Make every day count</p>
      </header>

      <main className='main'>
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

          <form className='task-form' onSubmit={(event)=>{event.preventDefault(); handleAddTask();}}>
            
            <input
            ref={taskInputRef}
            type="text" 
            placeholder='What needs to be done?'  
            value={taskText} 
            onChange={(event)=> setTaskText(event.target.value)}
            />

            <button type='submit'>Add Task</button>
          </form>

          <ul className="task-list">
            {
              tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
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
