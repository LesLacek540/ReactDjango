import React from 'react';
import Notes from './components/Notes';
import TaskBar from './components/TaskBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Student Agenda</h1>
      </header>
      <div className="content">
        <Notes />
        <TaskBar />
      </div>
    </div>
  );
}

export default App;