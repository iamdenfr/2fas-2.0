import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();

  const [weatherData, setWeatherData] = useState(null);
  const [fireData, setFireData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [city, setCity] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://192.168.1.103:8000/api/weather/getWeather', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWeatherData(response.data.weatherData);
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  const fetchFireData = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://192.168.1.103:8000/api/weather/getFireProbability', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setFireData(response.data.fireProbability);
        } catch (error) {
            console.log('Error fetching fire data:', error);
        }
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
                })
            setCity(city.data);
            setUserData(response.data);

            console.log(response.data);
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };

  useEffect(() => {
    fetchWeatherData();
    fetchFireData();
    getUserData();

    const weatherData = setInterval(() => {
      fetchWeatherData();
    }, 60000);

    const fireData = setInterval(() => {
        fetchFireData();
    }, 60000);

    return () => {
        clearInterval(weatherData);
        clearInterval(fireData);
    };
  }, []);

  return (
    <div>
     <div className='wrap-center'>
      <div className='dashboard-container'>
        {userData && city ? (
          <div className='dashboard'>
            <h2>{t("dashboard.dashboard")}{userData.user.username}</h2>
            <h1>{city.city.name}</h1>
            <br />
          </div>
        ) : (
          <p>{t("loading")}</p>
        )}
        {fireData ? (
            <div className='dashboard'>
                <h2>{t("dashboard.fire")}</h2>
                <p>
                    <b>{fireData.message}</b>
                </p>
                <p>
                    <b>{(fireData.fireProbability * 100).toFixed(2)}%</b>
                </p>
            </div>
        ) : (
            <p>{t("loading")}</p>
        )}
        {weatherData ? (
          <div className='dashboard'>
            <h2>{t("dashboard.weather")}</h2>
            <p>
              {t("dashboard.temperature")}<b>{((weatherData.temp_min + weatherData.temp_max) / 2).toFixed(2)}°C</b>
            </p>
            <p>
              {t("dashboard.humidity")}<b>{weatherData.humidity}%</b>
            </p>
            <p>
              {t("dashboard.wind_speed")}<b>{weatherData.wind_speed} m/s</b>
            </p>
            <p>
              {t("dashboard.wind_direction")}<b>{weatherData.wind_deg}°</b>
            </p>
          </div>
        ) : (
          <p>{t("loading")}</p>
        )}
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
