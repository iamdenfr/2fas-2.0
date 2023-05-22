const Api = require('../models/ow_api.js');
const ApiData = require('../models/smoothdata.js');
const User = require('../models/user.js');

const axios = require('axios');
const sequelize = require('../sequelize.js');
const Sequelize = require('sequelize');
const config = require('../config/default.json');
const {
  smoothHumidity, 
  smoothMaxTemperature, 
  smoothMinTemperature, 
  smoothWindDirection, 
  smoothWindSpeed
} = require('./smooth.js');

async function fetchWeatherDataForCity(cityId) {
  try {
    const users = await User.findAll({
      where: {
        city: cityId,
        apikey: { [Sequelize.Op.not]: null },
      },
    });

    if (users.length > 0) {
      const user = users[0];
      const apiKey = user.apikey;

      const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=${config.units}`;

      try {
        const response = await axios.get(url);
        const weatherData = response.data;

        const windSpeed = weatherData.wind.speed;
        const windDirection = weatherData.wind.deg;
        const minTemperature = weatherData.main.temp_min;
        const maxTemperature = weatherData.main.temp_max;
        const datetime = new Date();
        const humidity = weatherData.main.humidity;

        const previousWrites = await Api.findAll({
          where: {
            city: cityId,
          },
          order: [['date', 'DESC']],
          limit: 5
        });

        const smoothedWindSpeed = smoothWindSpeed(windSpeed, previousWrites);
        const smoothedWindDirection = smoothWindDirection(windDirection, previousWrites);
        const smoothedMinTemperature = smoothMinTemperature(minTemperature, previousWrites);
        const smoothedMaxTemperature = smoothMaxTemperature(maxTemperature, previousWrites);
        const smoothedHumidity = smoothHumidity(humidity, previousWrites);

        await ApiData.create({
          city: cityId,
          wind_speed: smoothedWindSpeed,
          wind_deg: smoothedWindDirection,
          temp_min: smoothedMinTemperature,
          temp_max: smoothedMaxTemperature,
          date: datetime,
          humidity: smoothedHumidity,
        });

        await Api.create({
          city: cityId,
          wind_speed: windSpeed,
          wind_deg: windDirection,
          temp_min: minTemperature,
          temp_max: maxTemperature,
          date: datetime,
          humidity: humidity,
        });

        console.log(`Weather data fetched and saved for City ID ${cityId}`);
      } catch (error) {
        console.error(`Error fetching weather data for City ID ${cityId}:`, error);
      }
    } else {
      console.log(`No users found for City ID ${cityId}. You can create an API key on openweather.com and add it in the user profile.`);
    }
  } catch (error) {
    console.error(`Error fetching users for City ID ${cityId}:`, error);
  }
}

async function fetchWeatherDataForAllCities() {
  try {
    const cities = await User.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city']],
      group: ['city'],
    });
    for (let i = 0; i < cities.length; i++) {
      const cityId = cities[i].city;
      console.log(`Fetching weather data for City ID ${cityId}`);
      await fetchWeatherDataForCity(cityId);
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
}

async function start() {
  try {
    await sequelize.sync();

    await fetchWeatherDataForAllCities();

  } catch (error) {
    console.error('Error synchronizing database tables:', error);
  }
}

module.exports = {start};
