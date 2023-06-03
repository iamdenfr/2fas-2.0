import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [fireData, setFireData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/weather/getWeather', {
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
        const response = await axios.get('http://localhost:8000/api/weather/getFireProbability', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setFireData(response.data.fireProbability);
        } catch (error) {
            console.log('Error fetching fire data:', error);
        }
    };

  useEffect(() => {
    fetchWeatherData();
    fetchFireData();

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

  console.log(weatherData);
    console.log(fireData);  

  return (
    <div className='dashboard-container'>
      {weatherData && fireData ? (
        <div className='dashboard'>
          <h2>Weather Information</h2>
          <p>Temperature: {((weatherData.temp_min + weatherData.temp_max) / 2).toFixed(2)}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.wind_speed} m/s</p>
          <p>Wind Degree: {weatherData.wind_deg}°</p>
            <h2>Fire Probability</h2>
          <p>Fire Probability: {fireData.message}</p>
        <p>{(fireData.fireProbability*100).toFixed(2)}%</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Dashboard;
