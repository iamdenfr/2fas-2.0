import axios from 'axios';
import React, { useState } from 'react';
import Input from '../../utils/input';
import './registration.css';


const Registration = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [company, setCompany] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    };

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

    axios.post('http://localhost:8000/api/auth/register', user)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

    setName('');
    setEmail('');
    setPassword('');
    setCity('');
    setCountry('');
    setCompany('');
};

  return (
    <div className="auth-wrapper">
    <div className="authorization">
    <form onSubmit={handleSubmit}>
      <label>
        <div className='authorization__header'>Username:</div>
         <div className="input">
          <Input type="text" value={username} onChange={handleNameChange} />
         </div>
      </label>
      <br />
      <label>
       <div className='authorization__header'>Email:</div>
        <div className="input"> 
         <Input type="email" value={email} onChange={handleEmailChange} />
        </div>
      </label>
      <br />
      <label>
       <div className='authorization__header'>Password:</div>
        <div className="input"> 
         <Input type="password" value={password} onChange={handlePasswordChange} />
        </div>
      </label>
      <br />
      <label>
       <div className='authorization__header'>Country:</div>
        <div className="input">
         <Input type="text" value={country} onChange={handleCountryChange} />
        </div>
      </label>
      <br />
      <label>
       <div className='authorization__header'>City:</div>
        <div className="input">
         <Input type="text" value={city} onChange={handleCityChange} />
        </div>
      </label>
      <br />
      <label>
       <div className='authorization__header'>Company:</div>
        <div className="input">
         <Input type="text" value={company} onChange={handleCompanyChange} />
        </div>
      </label>
      <br />
      <button className="authorization__btn" type="submit">Register</button>
    </form>
    </div>
    </div>
  );
};

export default Registration;
