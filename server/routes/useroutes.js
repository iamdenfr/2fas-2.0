const Router = require('express');
const router = new Router();
const userController = require('../controllers/usercontroller.js');
const authMiddleware = require('../middleware/authmiddleware.js');

router.put('/update',
    authMiddleware.authToken,
    userController.updateUser
);

router.delete('/delete',
    authMiddleware.authToken,
    userController.deleteUser
);

router.get('/get',
    authMiddleware.authToken,
    userController.getUser
);

module.exports = router;