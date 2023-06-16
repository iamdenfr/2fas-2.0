const User = require('../models/user.js');
const Arduino = require('../models/arduino.js');
const Sensor = require('../models/sensor.js');
const City = require('../models/city.js');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

module.exports = {
    async usersCount(req, res) {
        try {
            const usersCount = await User.count();
            res.status(200).send({
                usersCount: usersCount
            });
        } catch (error) {
            res.status(500).send({
                error: error
            });
        }
    },

    async citiesCount(req, res) {
        try {
            const citiesCount = await User.count(
                {
                    distinct: true,
                    col: 'city'
                }
            )
            res.status(200).send({
                citiesCount: citiesCount
            });
        } catch (error) {
            res.status(500).send({
                error: error
            });
        }
    },

    async usersByCountry(req, res) {
        try {
            const usersByCountry = await User.count(
                {
                    group: ['country'],
                    attributes: ['country']
                }
            )
            res.status(200).send({
                usersByCountry: usersByCountry
            });
        } catch (error) {
            res.status(500).send({
                error: error
            });
        }
    }
}