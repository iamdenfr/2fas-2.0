import axios from 'axios';
import React, { useState } from 'react';
import Input from '../../utils/input';


const Registration = () => {
    const [name, setName] = useState('');
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
        name,
        password,
        city,
        country,
        company
    };

    axios.post('http://localhost:5000/api/users/register', user)
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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <Input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Email:
        <Input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <Input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
        <label>
            Country:
            <Input type="text" value={country} onChange={handleCountryChange} />
        </label>
        <br />
        <label>
            City:
            <Input type="text" value={city} onChange={handleCityChange} />
        </label>
        <br />
        <label>
            Company:
            <Input type="text" value={company} onChange={handleCompanyChange} />
        </label>
        <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
