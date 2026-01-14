import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BlocklyIDE from './components/BlocklyIDE';
import { getGlobalAnimations } from './utils/animationUtils';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <style>{getGlobalAnimations()}</style>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ide" element={<BlocklyIDE />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;