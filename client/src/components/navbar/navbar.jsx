import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { logout } from "../../actions/auth";
import { useDispatch, useSelector} from "react-redux";
import { auth } from "../../actions/auth";


const Navbar = () => {

    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]);

    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__header">2FAS</div>
                {!isAuth && 
                <div className="navbar__login"><NavLink to="/login">Увійти</NavLink></div> 
                }
                {!isAuth && 
                <div className="navbar__registration"><NavLink to="/registration">Зареєструватися</NavLink></div> 
                }
                {isAuth && 
                <div className="navbar__login" onClick={() => dispatch(logout()) }><NavLink to="/login">Вийти з акаунту</NavLink></div> 
                }
                {isAuth &&
                <div className="navbar__registration"><NavLink to="/dashboard">До панелі</NavLink></div>
                }
                {isAuth &&
                <div className="navbar__registration"><NavLink to="/updateuser">Профіль</NavLink></div>
                }
                <div className='navbar__language'>
                </div>
            </div>
        </div>
    );
}

export default Navbar;