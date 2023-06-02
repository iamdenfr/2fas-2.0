import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { logout } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
    const dispatch = useDispatch();
    // const auth = () => {
    //     const token = localStorage.getItem('token');
    //     const expiresIn = new Date(localStorage.getItem('expiresIn')); 
    //     const now = new Date().getTime(); 
    //     return token && expiresIn && now < expiresIn.getTime();
    // };
      
    // const isAuth = auth();

    const isAuth = useSelector(state => state.auth.isAuth);
    
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__header">2FAS</div>
                {!isAuth && 
                <div className="navbar__login"><NavLink to="/login"><div>Увійти</div></NavLink></div> 
                }
                {!isAuth && 
                <div className="navbar__registration"><NavLink to="/registration"><div>Зареєструватися</div></NavLink></div> 
                }
                {isAuth && 
                <div className="navbar__login" onClick={() => dispatch(logout()) }><NavLink to="/login"><div>Вийти</div></NavLink></div> 
                }
                <div className='navbar__language'>
                </div>
            </div>
        </div>
    );
}

export default Navbar;