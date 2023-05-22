const {Model, DataTypes} = require('sequelize');
const sequelize = require('../sequelize.js');

class Api extends Model {}

Api.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    city: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wind_speed: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    wind_deg: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    temp_min: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    temp_max: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    humidity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'api',
    tableName: 'openweather_api'
});

module.exports = Api;