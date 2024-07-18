import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Details from './Details';

function TaskBar() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:8000/api/tasks/');
    setTasks(response.data.reverse());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/tasks/', { title, due_date: dueDate, color });
      setTitle('');
      setDueDate('');
      setColor('#ffffff');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleTaskDelete = (deletedTaskId) => {
    setTasks(tasks.filter(task => task.id !== deletedTaskId));
  };

  return (
    <div className="tasks-section">
      <h2>Tasks</h2>
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          {/* ... (keep existing form fields) ... */}
        </form>
      </div>
      <div className="card-grid">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="card task-card"
            style={{ backgroundColor: task.color }}
            onClick={() => handleTaskClick(task)}
          >
            <h3>{task.title}</h3>
            <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      {selectedTask && (
        <Details
          item={selectedTask}
          type="task"
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
          onDelete={handleTaskDelete}
        />
      )}
    </div>
  );
}

export default TaskBar;