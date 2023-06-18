import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './dashboard.css';
import {Chart} from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment'

const Dashboard = () => {
  const { t } = useTranslation();

  const [weatherData, setWeatherData] = useState(null);
  const [fireData, setFireData] = useState(null);
  const [fireMessage, setFireMessage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [city, setCity] = useState(null);
  const [arduinos, setArduinos] = useState(null);
  const [sensorData, setSensorData] = useState(null);
  const [weatherDataLastHour, setWeatherDataLastHour] = useState(null);

  const fetchArduinos = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/user/getArduinos', {
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
      const response = await axios.get('http://localhost:8000/api/weather/getSensorData', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSensorData(response.data.sensorData);
    } catch (error) {
      console.log('Error fetching sensor data:', error);
    }
  }, []);

  const fetchWeatherData = useCallback(async () => {
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
  }, []);

  const fetchWeatherDataLastHour = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/weather/lastHour', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWeatherDataLastHour(response.data.weatherData);
    } catch (error) {
      console.log('Error fetching weather data for the last hour:', error);
    }
  }, []);

  const fetchFireData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/weather/getFireProbability', {
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

  const getUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/user/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cityResponse = await axios.get('http://localhost:8000/api/user/getCity', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCity(cityResponse.data.city);
      setUserData(response.data.user);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }, []);
  

  const renderWeatherChart = useCallback(() => {
    if (!weatherDataLastHour) {
      return;
    }
  
    const labels = weatherDataLastHour.map((data) => moment(data.date).format('ll HH:mm'));
    const temperatures = weatherDataLastHour.map((data) => ((data.temp_min + data.temp_max) / 2).toFixed(2));
    const humidity = weatherDataLastHour.map((data) => data.humidity);
  
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    const cth = document.getElementById('humidityChart').getContext('2d');
    const existingChart = Chart.getChart(ctx);
    const existingChartHumidity = Chart.getChart(cth);
    if (existingChart) {
      existingChart.destroy();
    }
    if (existingChartHumidity) {
      existingChartHumidity.destroy();
    }
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: t('dashboard.charttemperature'),
            data: temperatures,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            parser: 'll HH:mm',
          },
          y: {
            title: {
              display: true,
              text: t('dashboard.charttemperature'),
            },
            suggestedMin: temperatures.reduce((a, b) => Math.min(a, b)) - 1,
            suggestedMax: temperatures.reduce((a, b) => Math.max(a, b)) + 1
          },
        },
      },
    });
    new Chart(cth, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: t('dashboard.charthumidity'),
            data: humidity,
            backgroundColor: 'rgba(175, 102, 192, 0.2)',
            borderColor: 'rgba(175, 102, 192, 1)',
            borderWidth: 1, 
            pointRadius: 2,
          },  
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            parser: 'll HH:mm',
          },
          y: {
            title: {
              display: true,
              text: t('dashboard.charthumidity'),
            },
            suggestedMin: humidity.reduce((a, b) => Math.min(a, b)) - 5 > 95 ? 100 : humidity.reduce((a, b) => Math.min(a, b)) - 5,
            suggestedMax: humidity.reduce((a, b) => Math.max(a, b)) + 5 < 5 ? 0 : humidity.reduce((a, b) => Math.max(a, b)) + 5,
          },
        },
      },
    });
  }, [weatherDataLastHour, t]);
  

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchWeatherData(), 
        fetchFireData(), 
        getUserData(), 
        fetchArduinos(), 
        fetchSensorData(), 
        fetchWeatherDataLastHour()]);
    };

    fetchData();

    const weatherDataInterval = setInterval(fetchWeatherData, 60000);
    const fireDataInterval = setInterval(fetchFireData, 60000);

    return () => {
      clearInterval(weatherDataInterval);
      clearInterval(fireDataInterval);
    };
  }, [fetchFireData, fetchArduinos, fetchSensorData, fetchWeatherData, getUserData, fetchWeatherDataLastHour]);

  useEffect(() => {
    if (!weatherDataLastHour || weatherDataLastHour.length === 0) {
      return;
    }
    renderWeatherChart();

    const chartInterval = setInterval(renderWeatherChart, 60000);

    return () => {
      clearInterval(chartInterval);
    }

  }, [renderWeatherChart, weatherDataLastHour]);


  return (
    <div>
      <div className="wrap-center">
        <div className="dashboard-container">
          {userData && city ? (
            <div className="dashboard">
              <h2>
                {t('dashboard.dashboard')}
                {userData.username}
              </h2>
              <h1>
                {city.name}, {city.country}
              </h1>
              <br />
            </div>
          ) : (
            <p>{t('loading')}</p>
          )}
          {fireData ? (
            <div className="dashboard">
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
            <div className="dashboard">
              <h2>{t('dashboard.weather')}</h2>
              <p>
                {t('dashboard.temperature')}
                <b>{((weatherData.temp_min + weatherData.temp_max) / 2).toFixed(2)}°C</b>
              </p>
              <p>
                {t('dashboard.humidity')}
                <b>{weatherData.humidity}%</b>
              </p>
              <p>
                {t('dashboard.wind_speed')}
                <b>{weatherData.wind_speed} m/s</b>
              </p>
              <p>
                {t('dashboard.wind_direction')}
                <b>{weatherData.wind_deg}°</b>
              </p>
            </div>
          ) : (
            <p>{t('loading')}</p>
          )}
        </div>
      </div>
      <div className="wrap-center">
        <div className="dashboard-container">
          {weatherDataLastHour != null ? (
            <div className="dashboard">
              <h2>{t('dashboard.weather')}</h2>
              <canvas id="temperatureChart" width="600" height="300"></canvas>
              <canvas id="humidityChart" width="600" height="300"></canvas>
            </div>
          ) : (
            <p>{t('loading')}</p>
          )}
        </div>
      </div>
      <div className="wrap-center">
        <div className="dashboard-container">
          {arduinos && sensorData ? (
            <div className="dashboard-container">
              <h1>{t('dashboard.arduinos')}</h1>
              {arduinos.map((arduino) => (
                <div className="dashboard" key={arduino.id}>
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
                      <div className="dashboard" key={sensor.arduino_id}>
                        <p>
                          <b>
                            {t('dashboard.temperature')} {sensor.temperature}
                          </b>
                        </p>
                        <p>
                          <b>
                            {t('dashboard.humidity')} {sensor.humidity}
                          </b>
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
