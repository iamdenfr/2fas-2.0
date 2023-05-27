const ApiData = require('../models/smoothdata.js');
const User = require('../models/user.js');
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
    }
}