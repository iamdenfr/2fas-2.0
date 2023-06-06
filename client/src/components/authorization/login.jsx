import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";
import { login } from "../../actions/auth";
import { useDispatch} from "react-redux";
import Input from "../../utils/input";
import { useTranslation } from "react-i18next";

const Login = () => {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <div className="auth-wrapper">
            <div className="authorization">
                <div className="authorization__header">{t("login.title")}</div>
                <Input 
                    value={email} 
                    onChange={setEmail} 
                    type="text" 
                    placeholder={t("login.username")} 
                />
                <Input 
                    value={password} 
                    onChange={setPassword} 
                    type="password" 
                    placeholder={t("login.password")} 
                />
                <div className="authorization__btn" onClick={() =>
                    dispatch(login(email, password)).then(() => {
                        navigate('/dashboard')
                    })}
                >
                    {t("login.login")}
                </div>
            </div>
        </div>
    );

}

export default Login;