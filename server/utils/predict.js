const Api = require('../models/ow_api.js');
const Sequelize = require('sequelize');
const { smoothWindSpeed, smoothHumidity } = require('./smooth.js');

function temperature(weatherData) {
    const minTemperature = weatherData.reduce((total, current) => total + current.temp_min, 0) / weatherData.length;
    const maxTemperature = weatherData.reduce((total, current) => total + current.temp_max, 0) / weatherData.length;
    return (minTemperature + maxTemperature) / 2;
}

async function predictFireProbability(weatherData) {
    try{
        const windSpeed = weatherData[0].wind_speed;
        const humidity = weatherData[0].humidity;

        const smoothedWindSpeed = smoothWindSpeed(windSpeed, weatherData);
        const smoothedHumidity = smoothHumidity(humidity, weatherData);
        const smoothedTemperature = temperature(weatherData);

        const windSpeedProbability = 1 - (smoothedWindSpeed / 100);
        const humidityProbability = smoothedHumidity / 100;
        const temperatureProbability = smoothedTemperature / 100;

        const fireProbability = windSpeedProbability * temperatureProbability / humidityProbability;

        return fireProbability;
    } catch (error) {
        console.error('Error predicting fire probability:', error);
    }
}

module.exports = { predictFireProbability };