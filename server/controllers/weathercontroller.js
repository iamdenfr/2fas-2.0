const ApiData = require('../models/smoothdata.js');
const User = require('../models/user.js');
const Arduino = require('../models/arduino.js');
const Sensor = require('../models/sensor.js');
const Sequelize = require('sequelize');
const { predictFireProbability } = require('../utils/predict.js');

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
            if (!weatherData) {
                return res.status(400).send({
                    error: `No weather data found for ${user.city}. Wait a few minutes while the data is fetching.`
                });
            }
            res.send({
                weatherData: weatherData
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'An error has occured trying to fetch the weather data'
            });
        }
    },
    async getFireProbability(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            const weatherData = await ApiData.findAll({
                where: {
                    city: user.city
                },    
                order: [['date', 'DESC']],
                limit: 10
            });
            const fireProbability = await predictFireProbability(weatherData);
            console.log(`Fire probability: ${fireProbability}`);
            res.send({
                fireProbability: fireProbability
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'An error has occured trying to fetch the fire probability'
            });
        }
    },

    async getSensorData(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            const arduinos = await Arduino.findAll({
                where: {
                    company: user.company
                }
            });
            if (!arduinos) {
                return res.status(400).send({
                    error: `No arduinos found for ${user.city}. Wait a few minutes while the data is fetching.`
                });
            }
            const arduinoIds = arduinos.map(arduino => arduino.id);
            const sensorData = await Sensor.findAll({
                where: {
                    arduino_id: arduinoIds
                },
                attributes: [
                    'arduino_id',
                    'temperature', 
                    'humidity',
                    [Sequelize.fn('max', Sequelize.col('date')), 'latestDate']
                ],
                group: ['arduino_id', 'temperature', 'humidity']
            });

            if (!sensorData) {
                return res.status(400).send({
                    error: `No sensor data found for ${user.city}.`
                });
            }

            res.send({
                sensorData: sensorData
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'An error has occured trying to fetch the sensor data'
            });
        }
    },

    async lastHour(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            const weatherData = await ApiData.findAll({
                where: {
                    city: user.city,
                    date: {
                        [Sequelize.Op.gte]: new Date(new Date() - 3 * 60 * 60 * 1000)
                    }
                },    
                order: [['date', 'DESC']],
                limit: 90
            });
            if (!weatherData) {
                return res.status(400).send({
                    error: `No weather data found for ${user.city}. Wait a few minutes while the data is fetching.`
                });
            }
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