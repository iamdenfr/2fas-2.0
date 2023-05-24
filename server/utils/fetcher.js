const axios = require("axios");
const { Op } = require('sequelize');
const User = require('../models/user.js');
const Api = require('../models/ow_api.js');
const ApiData = require('../models/smoothdata.js');
const { smoothHumidity, smoothMaxTemperature, smoothMinTemperature, smoothWindSpeed } = require('./smooth');
const config = require('../config/default.json');
const Sequelize = require('sequelize');

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
          if (response.status !== 200) {
            throw new Error(`Error fetching weather data for City ID ${cityId}: ${response.statusText}`)
          } else {
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
              date: {
                [Op.gt]: datetime - 30 * 60 * 1000
              }
            },
            order: [['date', 'DESC']],
            limit: 5
          });
  
          const smoothedWindSpeed = smoothWindSpeed(windSpeed, previousWrites);
          const smoothedMinTemperature = smoothMinTemperature(minTemperature, previousWrites);
          const smoothedMaxTemperature = smoothMaxTemperature(maxTemperature, previousWrites);
          const smoothedHumidity = smoothHumidity(humidity, previousWrites);
  
          if (previousWrites.length > 0) {
            await ApiData.create({
              city: cityId,
              wind_speed: smoothedWindSpeed,
              wind_deg: windDirection,
              temp_min: smoothedMinTemperature,
              temp_max: smoothedMaxTemperature,
              date: datetime,
              humidity: smoothedHumidity,
            });
          }
  
          if (weatherData.weather.length > 0) {
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
          } else {
            console.log("No response from API");
          }
        }
  
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

module.exports = {
    fetchWeatherDataForCity
}
