const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const User = require('../models/user.js');
const Company = require('../models/company.js');
const City = require('../models/city.js');
const { validationResult } = require('express-validator');

module.exports = {
  async register(req, res) {
    try {
      const { email, username, password, city, country, company } = req.body;
      let newCompany;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({
          errors: errors.array(),
          message: 'Invalid registration data'
        });
      }
      
      const candidate = await User.findOne({
        where: {
          email: email
        }
      });
  
      if (candidate) {
        return res.status(400).send({
          error: `The email ${email} is already in use.`
        });
      }

      const candidateUsername = await User.findOne({
        where: {
          username: username
        }
      });

      if (candidateUsername) {
        return res.status(400).send({
          error: `The username ${username} is already in use.`
        });
      }
  
      if (company === '') {
        newCompany = await Company.create({
          name: username
        });
      } else {
        const companyCandidate = await Company.findOne({
          where: {
            name: company
          }
        });
        if (!companyCandidate) {
          newCompany = await Company.create({
            name: company
          });
        } else {
          newCompany = companyCandidate;
        }
      }

      const candidateCity = await City.findOne(
        {
          where: {
            name: city,
            country: country
          }
        }
      );
      if (!candidateCity) {
        return res.status(400).send({
          error: `The city ${city} in ${country} does not exist.`
        });
      } 
      const cityId = candidateCity.id;
      console.log(`City ID: ${cityId}`);
  
      const hashPassword = await bcrypt.hash(password, 8);
      
      const user = await User.create({
        email: email,
        username: username,
        password: hashPassword,
        city: cityId,
        company: newCompany.id
      });
  
      res.send(user);
  
    } catch (err) {
      res.status(400).send({
        error: 'Server error',
        message: err.message
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let user;
      user = await User.findOne({
        where: {
          email: email
        }
      });

      if(!user) {
        user = await User.findOne({
          where: {
            username: email
          }
        });
      }

      if (!user) {
        return res.status(403).send({
          error: 'There is no user with such email or username'
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The password is incorrect'
        });
      }

      res.send({
        username: user.username,
        message: 'You have successfully logged in',
        token: jwt.sign({id: user.id}, config.authentication.jwtSecret, {
          expiresIn: '1d'
        })
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to log in.'
      });
    }
  }
}