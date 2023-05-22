const {Model, DataTypes} = require('sequelize');
const sequelize = require('../sequelize.js');

class ApiData extends Model {}

ApiData.init({
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
    modelName: 'smoothdata',
    tableName: 'apidata'
});

module.exports = ApiData;