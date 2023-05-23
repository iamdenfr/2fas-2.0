const User = require('../models/user.js');

const sequelize = require('../sequelize.js');
const Sequelize = require('sequelize');
const fetcher = require('./fetcher.js');

async function fetchWeatherDataForAllCities() {
  try {
    const cities = await User.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city']],
      group: ['city'],
    });
    for (let i = 0; i < cities.length; i++) {
      const cityId = cities[i].city;
      console.log(`Fetching weather data for City ID ${cityId}`);
      await fetcher.fetchWeatherDataForCity(cityId);
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
