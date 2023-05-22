const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

function authToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({
      error: 'Authentication failed'
    });
  }

  jwt.verify(token, config.authentication.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).send({
        error: 'Invalid token'
      });
    }

    req.user = user;
    next();
  });
}

module.exports = {
  authToken
};
