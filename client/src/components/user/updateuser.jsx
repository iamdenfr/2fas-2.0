import React, { useState } from 'react';
import './updateuser.css';
import Input from '../../utils/input';
import { updateUser, deleteUser } from '../../actions/user';
import { connect } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const UpdateUser = ({ updateUser, deleteUser }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cityData, setCurrentCity] = useState(null);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setShowUpdateConfirmation(true);
  };

  const handleConfirmUpdate = () => {
    const token = localStorage.getItem('token');

    const user = {
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
      city: city.trim(),
      apikey: apiKey.trim(),
    };

    updateUser(user, token);

    setShowUpdateConfirmation(false);
    };

  const handleCancelUpdate = () => {
        setShowUpdateConfirmation(false);
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    deleteUser(token);
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const getUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://192.168.1.103:8000/api/user/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const city = await axios.get(`http://192.168.1.103:8000/api/user/getCity`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentCity(city.data);
      setUserData(response.data);

      console.log(response.data);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {userData && cityData ? (
        <div className="user-wrapper">
          <div className="user">
            <div className="user__header">User data</div>
            <div className="user__data">
              <div className="user__data__item">Email: {userData.user.email}</div>
              <div className="user__data__item">Username: {userData.user.username}</div>
              <div className="user__data__item">City: {cityData && cityData.city.name}</div>
              <div className="user__data__item">Country: {cityData && cityData.city.country}</div>
              <div className="user__data__item">API key: {userData.user.apikey}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="update-wrapper">
        <div className="update">
          <div className="update__header">Update user</div>
          <Input
            value={email}
            onChange={setEmail}
            type="text"
            placeholder="Enter your new email..."
          />
          <Input
            value={username}
            onChange={setUsername}
            type="text"
            placeholder="Enter your new username..."
          />
          <Input
            value={password}
            onChange={setPassword}
            type="password"
            placeholder="Enter your new password..."
          />
          <Input
            value={city}
            onChange={setCity}
            type="text"
            placeholder="Enter your new city..."
          />
          <Input
            value={apiKey}
            onChange={setApiKey}
            type="text"
            placeholder="Enter your new api key..."
          />
          <div className="update__btn" onClick={handleUpdateUser}>
            Update
          </div>
          <div className="update__btn" onClick={handleDeleteUser}>
            Delete
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>Are you sure you want to delete the user?</p>
            <div className="confirmation-buttons">
              <div className="confirmation-btn" onClick={handleConfirmDelete}>
                Yes
              </div>
              <div className="confirmation-btn" onClick={handleCancelDelete}>
                No
              </div>
            </div>
          </div>
        </div>
      )}
        {showUpdateConfirmation && (
            <div className="confirmation-overlay">
                <div className="confirmation-box">
                    <p>Are you sure you want to update the user?</p>
                    <div className="confirmation-buttons">
                        <div className="confirmation-btn" onClick={handleConfirmUpdate}>
                            Yes
                        </div>
                        <div className="confirmation-btn" onClick={handleCancelUpdate}>
                            No
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default connect(null, { updateUser, deleteUser })(UpdateUser);
