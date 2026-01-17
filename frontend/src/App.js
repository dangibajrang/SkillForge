import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SkillForge</h1>
        <p>Learning & Assessment Platform</p>
        <p>hello from chinmay</p>
        <p>hello from chinmay1</p>
        <p>hello from chinmay2</p>


      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* TODO: Add routes for courses, assessments, etc. */}
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to SkillForge</h2>
      <p>Start your learning journey today!</p>
    </div>
  );
}

export default App;
