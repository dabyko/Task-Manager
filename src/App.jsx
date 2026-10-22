import { useState } from 'react';
import './App.css'


function App() {

  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  
  function handleAddTask() {

    if (taskText.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  }

  function handleToggleTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      })
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
            <input type="text" placeholder='What needs to be done?'  value={taskText}  onChange={(event)=> setTaskText(event.target.value)}/>
            <button type='submit'>Add Task</button>
          </form>

          <ul className="task-list">
            {
              tasks.map((task) => (
                <li key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                  />
              {task.text}
                </li>
              ))
            }
          </ul>

        </section>
      </main>
    </div>
  );
}

export default App
