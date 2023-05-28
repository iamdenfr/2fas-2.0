import React, { useState } from 'react';
import Input from '../../utils/input';
import './registration.css';
import { register } from '../../actions/auth.js';


const Registration = () => {
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
        // Reset the form fields after submission
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
                <div className="authorization__header">Register</div>
                <Input value={username} onChange={setUsername} type="text" placeholder="Enter your name..." />
                <Input value={email} onChange={setEmail} type="text" placeholder="Enter your email..." />
                <Input value={password} onChange={setPassword} type="password" placeholder="Enter your password..." />
                <Input value={country} onChange={setCountry} type="text" placeholder="Enter your country..." />
                <Input value={city} onChange={setCity} type="text" placeholder="Enter your city..." />
                <Input value={company} onChange={setCompany} type="text" placeholder="Enter your company..." />
                <button className="authorization__btn" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
};

export default (Registration);
