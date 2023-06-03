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
                <div className="navbar__login"><NavLink to="/login"><div>Увійти</div></NavLink></div> 
                }
                {!isAuth && 
                <div className="navbar__registration"><NavLink to="/registration"><div>Зареєструватися</div></NavLink></div> 
                }
                {isAuth && 
                <div className="navbar__login" onClick={() => dispatch(logout()) }><NavLink to="/login"><div>Вийти</div></NavLink></div> 
                }
                {isAuth &&
                <div className="navbar__registration"><NavLink to="/dashboard"><div>До панелі</div></NavLink></div>
                }
                {isAuth &&
                <div className="navbar__registration"><NavLink to="/updateuser"><div>Редагувати профіль</div></NavLink></div>
                }
                <div className='navbar__language'>
                </div>
            </div>
        </div>
    );
}

export default Navbar;