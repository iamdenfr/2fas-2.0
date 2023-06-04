import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { logout } from "../../actions/auth";
import { useDispatch, useSelector} from "react-redux";
import { auth } from "../../actions/auth";
import { useTranslation } from "react-i18next";


const Navbar = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

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
                <div className="navbar__login"><NavLink to="/login">{t("navbar.login")}</NavLink></div> 
                }
                {!isAuth && 
                <div className="navbar__registration"><NavLink to="/registration">{t("navbar.registration")}</NavLink></div> 
                }
                {isAuth && 
                <div className="navbar__login" onClick={() => dispatch(logout()) }><NavLink to="/login">{t('navbar.logout')}</NavLink></div> 
                }
                {isAuth &&
                <div className="navbar__registration"><NavLink to="/dashboard">{t("navbar.dashboard")}</NavLink></div>
                }
                {isAuth &&
                <div className="navbar__registration"><NavLink to="/updateuser">{t("navbar.profile")}</NavLink></div>
                }
                <div className='navbar__language'>
                    <button className="navbar__login" onClick={() => changeLanguage('en')}>EN</button>
                    <button className="navbar__login" onClick={() => changeLanguage('ua')}>UA</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;