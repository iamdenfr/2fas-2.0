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

module.exports = router;