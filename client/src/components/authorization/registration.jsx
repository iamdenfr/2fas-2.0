import React, { useState } from 'react';
import Input from '../../utils/input';
import './registration.css';
import { register } from '../../actions/auth.js';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';


const Registration = ({register}) => {
    const { t } = useTranslation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [company, setCompany] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            email,
            username,
            password,
            city,
            country,
            company
        };

        register(user);
        setUsername('');
        setEmail('');
        setPassword('');
        setCountry('');
        setCity('');
        setCompany('');
    };

    return (
        <div className="auth-wrapper">
            <div className="authorization">
                <div className="authorization__header">
                    {t("registration.title")}
                </div>
                <Input 
                    value={username} 
                    onChange={setUsername} 
                    type="text" 
                    placeholder={t("registration.username")} 
                />
                <Input 
                    value={email} 
                    onChange={setEmail} 
                    type="text" 
                    placeholder={t("registration.email")} 
                />
                <Input 
                    value={password} 
                    onChange={setPassword} 
                    type="password" 
                    placeholder={t("registration.password")} 
                />
                <Input 
                    value={country} 
                    onChange={setCountry} 
                    type="text" 
                    placeholder={t("registration.country")} 
                />
                <Input 
                    value={city} 
                    onChange={setCity} 
                    type="text" 
                    placeholder={t("registration.city")} 
                />
                <Input 
                    value={company} 
                    onChange={setCompany} 
                    type="text" 
                    placeholder={t("registration.company")} 
                />
                <button 
                    className="authorization__btn" 
                    onClick={handleSubmit}>
                    {t("registration.register")}
                </button>
            </div>
        </div>
    );
};

export default connect(null, {register})(Registration);
