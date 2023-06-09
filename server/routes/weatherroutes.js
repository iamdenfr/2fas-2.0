const Router = require('express');
const router = new Router();
const weatherController = require('../controllers/weathercontroller.js');
const authMiddleware = require('../middleware/authmiddleware.js');

router.get('/getWeather', 
    authMiddleware.authToken,
    weatherController.getWeather);

router.get('/getFireProbability',
    authMiddleware.authToken,
    weatherController.getFireProbability);

router.get('/getSensorData',
    authMiddleware.authToken,
    weatherController.getSensorData);

router.get('/lastHour',
    authMiddleware.authToken,
    weatherController.lastHour);

module.exports = router;