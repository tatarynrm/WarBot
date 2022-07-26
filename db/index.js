const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize({
    database: process.env.DATA_BASE_NAME,
    username: process.env.DATA_USERNAME,
    password: process.env.DATA_PASSWORD,
    host: process.env.DATA_HOST,
    port: process.env.DATA_PORT,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
        }
    },
});
module.exports = sequelize