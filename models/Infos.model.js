const Sequelize = require('sequelize');
const config = require('../config/config');

const infos = config.define("Infos", {
    address: Sequelize.STRING,
    email: Sequelize.STRING,
    hobby: Sequelize.STRING
});

module.exports = infos;