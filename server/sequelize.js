const { Sequelize } = require('sequelize');
const config = require('./config/default.json');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.dbport,
    dialect: config.dialect,
  }
);

module.exports = sequelize;
