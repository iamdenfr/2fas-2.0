import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";
import { login } from "../../actions/auth";
import { useDispatch} from "react-redux";
import Input from "../../utils/input";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <div className="auth-wrapper">
            <div className="authorization">
                <div className="authorization__header">Login</div>
                <Input value={email} onChange={setEmail} type="text" placeholder="Enter your email..." />
                <Input value={password} onChange={setPassword} type="password" placeholder="Enter your password..." />
                <div className="authorization__btn" onClick={() =>
                    dispatch(login(email, password)).then(() => {
                        navigate('/dashboard')
                        })
                    }>Login</div>
            </div>
        </div>
    );

}

export default Login;