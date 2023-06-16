const Router = require('express');
const router = new Router();
const adminController = require('../controllers/admincontroller.js');
const authMiddleware = require('../middleware/authmiddleware.js');

router.get('/getUsers',
    authMiddleware.authToken,
    adminController.usersCount
);

router.get('/getCities',
    authMiddleware.authToken,   
    adminController.citiesCount
);

router.get('/getUsersByCountry',
    authMiddleware.authToken,
    adminController.usersByCountry
);

module.exports = router;