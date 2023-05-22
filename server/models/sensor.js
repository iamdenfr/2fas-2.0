const {Model, DataTypes} = require('sequelize');
const sequelize = require('../sequelize.js');

class Sensor extends Model {}

Sensor.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    arduino_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    temperature: {
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
    modelName: 'sensor',
    tableName: 'sensor_data'
});

module.exports = Sensor;