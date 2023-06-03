import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
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
            <h2>{userData.user.username}'s Dashboard</h2>
            <h1>{city.city.name}</h1>
            <br />
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        {weatherData && fireData ? (
          <div className='dashboard'>
            <h2>Weather Information</h2>
            <p>
              Temperature: <b>{((weatherData.temp_min + weatherData.temp_max) / 2).toFixed(2)}°C</b>
            </p>
            <p>
              Humidity: <b>{weatherData.humidity}%</b>
            </p>
            <p>
              Wind Speed: <b>{weatherData.wind_speed} m/s</b>
            </p>
            <p>
              Wind Degree: <b>{weatherData.wind_deg}°</b>
            </p>
            <h2>Fire Probability</h2>
            <p>
              <b>{fireData.message}</b>
            </p>
            <p>
              <b>{(fireData.fireProbability * 100).toFixed(2)}%</b>
            </p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
