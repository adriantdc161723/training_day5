const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');

const dburl = {
    database: process.env.config_database,
    username: process.env.config_username,
    password: process.env.config_password,
    host    : process.env.config_host,
    port    : process.env.config_port,
    dialect : process.env.config_dialect
}

module.exports = new Sequelize(dburl);