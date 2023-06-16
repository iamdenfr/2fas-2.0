import React, { useEffect } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './actions/auth';

import Registration from './components/authorization/registration';
import Login from './components/authorization/login';
import Dashboard from './components/dashboard/dashboard';
import Navbar from './components/navbar/navbar.jsx';
import UpdateUser from './components/user/updateuser';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to={isAuth ? '/dashboard' : '/login'} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={!isAuth? <Login /> : <Navigate to="/dashboard"/>} />
            <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/updateuser" element={isAuth ? <UpdateUser /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;