import React from 'react';
import './App.css';
import Registration from './components/authorization/registration';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
<<<<<<< Updated upstream

const App = () => {
=======
import Navbar from './components/navbar/navbar.jsx';
import { useSelector } from 'react-redux';

const App = () => {

  // const auth = () => {
  //   const token = localStorage.getItem('token');
  //   const expiresIn = new Date(localStorage.getItem('expiresIn')); 
  //   const now = new Date().getTime(); 
  //   return token && expiresIn && now < expiresIn.getTime();
  // };
  
  // const isAuth = auth();
  
  const isAuth = useSelector(state => state.auth.isAuth);
  console.log(isAuth);

>>>>>>> Stashed changes
  return (
    <BrowserRouter>
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Navigate to ="/registration"/>} />
          <Route path="/registration" element={<Registration />} />
<<<<<<< Updated upstream
=======
          <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
>>>>>>> Stashed changes
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
