const {Model, DataTypes} = require('sequelize');
const sequelize = require('../sequelize.js');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    apikey: {
        type: DataTypes.STRING
    },
    company: {
        type: DataTypes.INTEGER
    },
    is_admin: {
        type: DataTypes.BOOLEAN
    }
}, {    
    sequelize,
    modelName: 'user',
    tableName: 'users'
});

module.exports = User;