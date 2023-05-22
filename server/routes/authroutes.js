const Router = require('express');
const router = new Router();
const authController = require('../controllers/authcontroller.js');
const { body } = require('express-validator');

router.post('/register',
    [
    body('email').isEmail().withMessage('Invalid email'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('city').isInt().withMessage('Invalid city ID'),
    ],
  authController.register);

router.post('/login', authController.login);

module.exports = router;
