import './App.css'


function App() {
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
            <h3>0</h3>
          </div>

          <div className='stat-card'>
            <p>Completed</p>
            <h3>0</h3>
          </div>
        </section>

        <section className='tasks-section'>
          <h2>My Tasks</h2>
          <p>Manage your daily tasks</p>

          <form className='task-form' action="">
            <input type="text" placeholder='What needs to be done?'/>
            <button type='submit'>Add Task</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App
