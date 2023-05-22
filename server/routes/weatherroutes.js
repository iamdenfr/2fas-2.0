const Router = require('express');
const router = new Router();
const weatherController = require('../controllers/weathercontroller.js');
const authMiddleware = require('../middleware/authmiddleware.js');

router.get('/get', 
    authMiddleware.authToken,
    weatherController.getWeather);

module.exports = router;