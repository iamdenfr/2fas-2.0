import React from 'react';
import './App.css';
import Registration from './components/authorization/registration';
import Login from './components/authorization/login';
import Dashboard from './components/dashboard/dashboard';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/navbar.jsx';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.login.isAuth);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch({ type: 'SET_AUTH', payload: true });
    }
  }, [dispatch]);

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
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
