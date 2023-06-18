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
    const [error, setError] = useState('');

    const handleSubmit = () => {

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
                    error={error}
                    errorChange={setError}
                />
                {error && username.trim() === "" && <div className="error">{error}</div>}
                <Input 
                    value={email} 
                    onChange={setEmail} 
                    type="text" 
                    placeholder={t("registration.email")}
                    error={error}
                    errorChange={setError} 
                />
                {error && email.trim() === "" && <div className="error">{error}</div>}
                <Input 
                    value={password} 
                    onChange={setPassword} 
                    type="password" 
                    placeholder={t("registration.password")} 
                    error={error}
                    errorChange={setError}
                />
                {error && password.trim() === "" && <div className="error">{error}</div>}
                <Input 
                    value={country} 
                    onChange={setCountry} 
                    type="text" 
                    placeholder={t("registration.country")} 
                    error={error}
                    errorChange={setError}
                />
                {error && country.trim() === "" && <div className="error">{error}</div>}
                <Input 
                    value={city} 
                    onChange={setCity} 
                    type="text" 
                    placeholder={t("registration.city")} 
                    error={error}
                    errorChange={setError}
                />
                {error && city.trim() === "" && <div className="error">{error}</div>}
                <Input 
                    value={company} 
                    onChange={setCompany} 
                    type="text" 
                    placeholder={t("registration.company")} 
                />
                <button 
                    className="authorization__btn" 
                    onClick={() => {
                        if (username.trim() === '' 
                            || email.trim() === '' 
                            || password.trim() === '' 
                            || country.trim() === '' 
                            || city.trim() === '')  {
                            setError('Заповніть це поле!')
                        } else {
                        handleSubmit()
                        }
                    }}
                >
                    {t("registration.register")}
                </button>
            </div>
        </div>
    );
};

export default connect(null, {register})(Registration);
