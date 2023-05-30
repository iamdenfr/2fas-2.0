const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const Arduino = require('../models/arduino.js');
const Sensor = require('../models/sensor.js');
const City = require('../models/city.js');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

module.exports = {
    async updateUser(req, res) {
        try {
            const { email, username, password, apikey, city } = req.body;
            const userId = req.user.id;

            console.log(userId);

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).send({
                    error: 'User not found'
                });
            }

            if (email) {
                if (email !== user.email) {
                    const candidateEmail = await User.findOne({
                        where: {
                            email: email
                        }
                    });
                    if (candidateEmail) {
                        console.log("Email already in use");
                        return res.status(400).send({
                            error: `The email ${email} is already in use.`
                        });
                    } else {
                    console.log("Updating email");
                    user.email = email;
                    }
                }
            }

            if (username) {
                if (username !== user.username) {
                    const candidateUsername = await User.findOne({
                        where: {
                            username: username
                        }
                    });
                    if (candidateUsername) {
                        return res.status(400).send({
                            error: `The username ${username} is already in use.`
                        });
                    } else {
                    console.log("Updating username");
                    user.username = username;
                    }
                }
            }

            if (password){
                if (password.length > 6) {
                    const hashPassword = await bcrypt.hash(password, 8);
                    user.password = hashPassword;
                } else {
                    return res.status(400).send({
                        error: 'Password must be at least 6 characters long'
                    });
                }
            }

            if (apikey) {
                user.apikey = apikey;
            }

            if (city) {
                const candidateCity = await City.findOne({
                    where: {
                        name: city
                    }
                });
                if (!candidateCity) {
                    return res.status(400).send({
                        error: `The city ${city} is not in the database.`
                    });
                }
                user.city = candidateCity.id;
            }

            await user.save();

            token = jwt.sign(
                { id: user.id },
                config.authentication.jwtSecret,
                { expiresIn: '1d' }
            );

            res.send({
                message: 'User updated successfully',
                token: token
                });
        } catch (err) {
            res.status(500).send({
                error: 'Server error',
                message: err.message
            });
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).send({
                    error: 'User not found'
                });
            }
            await user.destroy();
            res.send({
                message: 'User deleted successfully'
            });
        } catch (err) {
            res.status(500).send({
                error: 'Server error',
                message: err.message
            });
        }
    },

    async getUser(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).send({
                    error: 'User not found'
                });
            }

            res.send({
                user: user
            });
        } catch (err) {
            res.status(500).send({
                error: 'Server error',
                message: err.message
            });
        }
    },

    async addArduino(req, res) {
        try {
            const userId = req.user.id;
            console.log(`User id: ${userId}`);
            const user = await User.findByPk(userId);
            const company = user.company;
            console.log(`Company: ${company}`);

            const { arduinoName, lontitude, latitude } = req.body;

            if (!arduinoName) {
                return res.status(400).send({
                    error: 'Arduino name is required'
                });
            }

            const candidateArduino = await Arduino.findOne({
                where: {
                    name: arduinoName,
                    company: company
                }
            });

            if (candidateArduino) {
                return res.status(400).send({
                    error: `The arduino ${arduinoName} is already in use.`
                });
            }

            const arduino = await Arduino.create({
                name: arduinoName,
                company: company,
                longitude: lontitude,
                latitude: latitude
            });

            await arduino.save();

            res.send({
                message: 'Arduino added successfully'
            });
        } catch (err) {
            res.status(500).send({
                error: 'Server error',
                message: err.message
            });
        }
    },

    async getArduinos(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId);
            const company = user.company;

            const arduinos = await Arduino.findAll({
                where: {
                    company: company
                }
            });

            res.send({
                arduinos: arduinos
            });
        } catch (err) {
            res.status(500).send({
                error: 'Server error',
                message: err.message
            });
        }
    },

    async deleteArduino(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId);
            const company = user.company;

            const { arduinoName } = req.body;

            const arduino = await Arduino.findOne({
                where: {
                    name: arduinoName,
                    company: company
                }
            });

            if (!arduino) {
                return res.status(404).send({
                    error: 'Arduino not found'
                });
            }

            const sensors = await Sensor.findAll({
                where: {
                    arduino_id: arduino.id   
                }
            });

            for (let i = 0; i < sensors.length; i++) {
                await sensors[i].destroy();
            }

            await arduino.destroy();

            res.send({
                message: 'Arduino deleted successfully'
            });
        } catch (err) {
            res.status(500).send({
                error: 'Server error',
                message: err.message
            });
        }
    }
}