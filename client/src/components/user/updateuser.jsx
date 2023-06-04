import React, { useState } from 'react';
import './updateuser.css';
import Input from '../../utils/input';
import { updateUser, deleteUser } from '../../actions/user';
import { connect } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

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
            <div className="user__header">{t("user.header")}</div>
            <div className="user__data">
              <div className="user__data__item">{t("user.email")}{userData.user.email}</div>
              <div className="user__data__item">{t("user.username")}{userData.user.username}</div>
              <div className="user__data__item">{t("user.city")}{cityData.city.name}</div>
              <div className="user__data__item">{t("user.country")}{cityData.city.country}</div>
              <div className="user__data__item">{t("user.apikey")}{userData.user.apikey? `${t("present")}` : `${t("absent")}`}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>{t("loading")}</div>
      )}
      <div className="update-wrapper">
        <div className="update">
          <div className="update__header">{t("user.update_header")}</div>
          <Input
            value={email}
            onChange={setEmail}
            type="text"
            placeholder={t("user.update_email")}
          />
          <Input
            value={username}
            onChange={setUsername}
            type="text"
            placeholder={t("user.update_username")}
          />
          <Input
            value={password}
            onChange={setPassword}
            type="password"
            placeholder={t("user.update_password")}
          />
          <Input
            value={city}
            onChange={setCity}
            type="text"
            placeholder={t("user.update_city")}
          />
          <Input
            value={apiKey}
            onChange={setApiKey}
            type="text"
            placeholder={t("user.update_apikey")}
          />
          <div className="update__btn" onClick={handleUpdateUser}>
          {t("user.update")}
          </div>
          <div className="update__btn" onClick={handleDeleteUser}>
          {t("user.delete")}
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>{t("user.delete_confirm")}</p>
            <div className="confirmation-buttons">
              <div className="confirmation-btn" onClick={handleConfirmDelete}>
              {t("yes")}
              </div>
              <div className="confirmation-btn" onClick={handleCancelDelete}>
              {t("no")}
              </div>
            </div>
          </div>
        </div>
      )}
        {showUpdateConfirmation && (
            <div className="confirmation-overlay">
                <div className="confirmation-box">
                    <p>{t("user.update_confirm")}</p>
                    <div className="confirmation-buttons">
                        <div className="confirmation-btn" onClick={handleConfirmUpdate}>
                        {t("yes")}
                        </div>
                        <div className="confirmation-btn" onClick={handleCancelUpdate}>
                        {t("no")}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default connect(null, { updateUser, deleteUser })(UpdateUser);
