import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();

  const [weatherData, setWeatherData] = useState(null);
  const [fireData, setFireData] = useState(null);
  const [fireMessage, setFireMessage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [city, setCity] = useState(null);
  const [arduinos, setArduinos] = useState(null);
  const [sensorData, setSensorData] = useState(null);

  const fetchArduinos = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://192.168.1.103:8000/api/user/getArduinos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArduinos(response.data.arduinos);
    } catch (error) {
      console.log('Error fetching arduinos:', error);
    }
  }, []);

  const fetchSensorData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://192.168.1.103:8000/api/weather/getSensorData', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSensorData(response.data.sensorData);
    } catch (error) {
      console.log('Error fetching sensor data:', error);
    }
  }, []);

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

  const fetchFireData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://192.168.1.103:8000/api/weather/getFireProbability', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFireData(response.data.fireProbability);

      if (response.data) {
        if (response.data.fireProbability.fireProbability < 0.2) {
          setFireMessage(t('dashboard.fire_probability.very_low'));
        } else if (response.data.fireProbability.fireProbability < 0.4) {
          setFireMessage(t('dashboard.fire_probability.low'));
        } else if (response.data.fireProbability.fireProbability < 0.6) {
          setFireMessage(t('dashboard.fire_probability.medium'));
        } else if (response.data.fireProbability.fireProbability < 0.8) {
          setFireMessage(t('dashboard.fire_probability.high'));
        } else {
          setFireMessage(t('dashboard.fire_probability.very_high'));
        }
      }

    } catch (error) {
      console.log('Error fetching fire data:', error);
    }
  }, [t]);

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
      setCity(city.data.city);
      setUserData(response.data.user);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    fetchFireData();
    getUserData();
    fetchArduinos();
    fetchSensorData();

    const weatherDataInterval = setInterval(() => {
      fetchWeatherData();
    }, 60000);

    const fireDataInterval = setInterval(() => {
      fetchFireData();
    }, 60000);

    return () => {
      clearInterval(weatherDataInterval);
      clearInterval(fireDataInterval);
    };
  }, [fetchFireData, fetchArduinos, fetchSensorData]);

  return (
    <div>
      <div className='wrap-center'>
        <div className='dashboard-container'>
          {userData && city ? (
            <div className='dashboard'>
              <h2>{t('dashboard.dashboard')}{userData.username}</h2>
              <h1>{city.name}</h1>
              <br />
            </div>
          ) : (
            <p>{t('loading')}</p>
          )}
          {fireData ? (
            <div className='dashboard'>
              <h2>{t('dashboard.fire')}</h2>
              <p>
                <b>{fireMessage}</b>
              </p>
              <p>
                <b>{(fireData.fireProbability * 100).toFixed(2)}%</b>
              </p>
            </div>
          ) : (
            <p>{t('loading')}</p>
          )}
          {weatherData ? (
            <div className='dashboard'>
              <h2>{t('dashboard.weather')}</h2>
              <p>
                {t('dashboard.temperature')}<b>{((weatherData.temp_min + weatherData.temp_max) / 2).toFixed(2)}°C</b>
              </p>
              <p>
                {t('dashboard.humidity')}<b>{weatherData.humidity}%</b>
              </p>
              <p>
                {t('dashboard.wind_speed')}<b>{weatherData.wind_speed} m/s</b>
              </p>
              <p>
                {t('dashboard.wind_direction')}<b>{weatherData.wind_deg}°</b>
              </p>
            </div>
          ) : (
            <p>{t('loading')}</p>
          )}
        </div>
      </div>
      <div className='wrap-center'>
        <div className='dashboard-container'>
          {arduinos && sensorData ? (
            <div className='dashboard'>
              <h1>{t('dashboard.arduinos')}</h1>
              {arduinos.map((arduino) => (
                <div className = "dashboard" key={arduino.id}>
                  <h2>{arduino.name}</h2>
                  <p>
                    <b>{arduino.latitude}</b>
                  </p>
                  <p>
                    <b>{arduino.longitude}</b>
                  </p>
                  {sensorData
                    .filter((sensor) => sensor.arduino_id === arduino.id)
                    .map((sensor) => (
                      <div className='dashboard' key={sensor.arduino_id}>
                        <p>
                          <b>{t('dashboard.temperature')} {sensor.temperature}</b>
                        </p>
                        <p>
                          <b>{t('dashboard.humidity')} {sensor.humidity}</b>
                        </p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ) : (
            <p>{t('loading')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
