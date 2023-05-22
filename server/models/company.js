const {Model, DataTypes} = require('sequelize');
const sequelize = require('../sequelize.js');

class Company extends Model {}

Company.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'company',
    tablename: 'company'
});

module.exports = Company;