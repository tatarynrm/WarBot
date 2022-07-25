const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    database: "dafi9p2k70e1m3",
    username: "xbpdwagsespcah",
    password: "18b29dfbdf4f73a61936fa2303b0abf11f6a0b38470035ea08ce04af886250bb",
    host: "ec2-52-49-120-150.eu-west-1.compute.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
        }
    },
});
module.exports = sequelize