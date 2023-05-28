import axios from 'axios';
import React, { useState } from 'react';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [cityOptions, setCityOptions] = useState([]);
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

    React.useEffect(() => {
        if (country) {
            axios.get(`http://localhost:8000/api/auth/cities/${country}`)
                .then(res => {
                    setCityOptions(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [country]);


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
    setCityOptions([]);
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
        <label>
            Country:
            <input type="text" value={country} onChange={handleCountryChange} />
        </label>
        <br />
        <label>
            City:
            <select value={city} onChange={handleCityChange}>
                {cityOptions.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
        </label>
        <br />
        <label>
            Company:
            <select value={company} onChange={handleCompanyChange}>
                {companyOptions.map((company) => (
                    <option key={company} value={company}>
                        {company}
                    </option>
                ))}
            </select>
        </label>
        <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
