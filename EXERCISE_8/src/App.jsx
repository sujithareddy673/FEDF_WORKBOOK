import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // This part of the logic remains the same
  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    const newTodo = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, newTodo]);
    setNewTask('');
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // --- STYLED JSX ---
  // The structure is the same, but now we add Tailwind's className attributes
  return (
    // Main container: dark background, full screen height, center content
    <div className="bg-slate-900 min-h-screen flex items-center justify-center font-sans">
      
      {/* To-Do card: slightly lighter background, padding, rounded corners, shadow */}
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        
        {/* Header text with color and font styling */}
        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400">My To-Do List</h1>
        
        {/* Form for adding new tasks */}
        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:outline-none focus:border-cyan-500"
          />
          <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold p-3 rounded-lg">
            Add
          </button>
        </form>

        {/* List of tasks with spacing between them */}
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task.id} className="bg-slate-700 p-4 rounded-lg flex items-center justify-between transition-all">
                {/* Task text: changes style when completed */}
                <span 
                  onClick={() => handleToggleComplete(task.id)}
                  className={`cursor-pointer ${task.completed ? 'line-through text-slate-500' : ''}`}
                >
                  {task.text}
                </span>
                {/* Delete button with red text */}
                <button 
                  onClick={() => handleDeleteTask(task.id)} 
                  className="text-red-400 hover:text-red-500 font-bold"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            // Message to show when no tasks are available
            <p className="text-center text-slate-500">No tasks found. Add one above!</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;