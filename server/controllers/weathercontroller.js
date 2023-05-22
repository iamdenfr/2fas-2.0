const ApiData = require('../models/smoothdata.js');
const User = require('../models/user.js');
const axios = require('axios');
const sequelize = require('../sequelize.js');
const Sequelize = require('sequelize');
const config = require('../config/default.json');
const authMiddleware = require('../middleware/authmiddleware.js');

module.exports = {
    async getWeather(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            const weatherData = await ApiData.findOne({
                where: {
                    city: user.city
                },    
                order: [['date', 'DESC']]
            });
            res.send({
                weatherData: weatherData
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'An error has occured trying to fetch the weather data'
            });
        }
    }
}