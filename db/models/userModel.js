const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../index')
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING
    },
    userName: {
        type: DataTypes.STRING
    },
    userTelegramId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }



}, {
    tableName: 'user',
    timestamps: true
});

module.exports = User


