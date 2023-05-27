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

        const windSpeedProbability = 0.9 + (smoothedWindSpeed / 100);
        const humidityProbability = smoothedHumidity / 100;
        const temperatureProbability = smoothedTemperature / 100;

        const fireProbability = windSpeedProbability * temperatureProbability / humidityProbability;

        switch (true) {
            case (fireProbability < 0.2):
                return `Low - No Fire Danger: ${fireProbability}`;
            case (fireProbability < 0.4):
                return `Medium. There is risk of fire: ${fireProbability}`;
            case (fireProbability < 0.6):
                return `High. There is a high risk of fire: ${fireProbability}`;
            case (fireProbability < 0.8):
                return `Very High. There is a very high risk of fire: ${fireProbability}. Please be careful`;
            default:
                return `Extreme. There is an extreme risk of fire: ${fireProbability}. Please be careful`;
        }
    } catch (error) {
        console.error('Error predicting fire probability:', error);
    }
}

module.exports = { predictFireProbability };