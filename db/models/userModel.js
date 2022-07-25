const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../index')
const User = sequelize.define('User', {
    // Model attributes are defined here
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
// `sequelize.define` also returns the model
// console.log('---------------------', User === sequelize.models.User); // true
// User.create({ email: "dsa@gmail.com", firstName: 'ewqew' });