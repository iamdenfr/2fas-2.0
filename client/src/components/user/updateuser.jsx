import React, { useState } from 'react';
import './updateuser.css';
import Input from '../../utils/input';
import { updateUser } from '../../actions/user';
import {connect} from 'react-redux';

const UpdateUser = ({updateUser}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const user = {
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
      city: city.trim(),
      apikey: apiKey.trim(),
    };

    updateUser(user, token);
  };

  return (
    <div>
        <div className="update-wrapper">
            <div className="update">
                <div className="update__header">Update user</div>
                <Input value={email} onChange={setEmail} type="text" placeholder="Enter your new email..." />
                <Input value={username} onChange={setUsername} type="text" placeholder="Enter your new username..." />
                <Input value={password} onChange={setPassword} type="password" placeholder="Enter your new password..." />
                <Input value={city} onChange={setCity} type="text" placeholder="Enter your new city..." />
                <Input value={apiKey} onChange={setApiKey} type="text" placeholder="Enter your new api key..." />
                <div className="update__btn" onClick={handleUpdateUser}>Update</div>
            </div>
        </div>
    </div>
  );
};

export default connect(null, {updateUser})(UpdateUser);
