import React from 'react';
import './App.css';
import Registration from './components/authorization/registration';
import Login from './components/authorization/login';
import Dashboard from './components/dashboard/dashboard';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/navbar.jsx';
import { useSelector } from 'react-redux';

const App = () => {
  
  const isAuth = useSelector(state => state.auth.isAuth);
  console.log(isAuth);

  return (
    <BrowserRouter>
    <div className="App">
    <Navbar/>
      <div>
         <Routes>
          <Route path="/" element={<Navigate to ="/registration"/>} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
