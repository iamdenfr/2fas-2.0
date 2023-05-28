import React from 'react';
import './App.css';
import Registration from './components/authorization/registration';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Navigate to ="/registration"/>} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
