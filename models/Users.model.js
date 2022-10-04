const Sequelize = require('sequelize');
const config = require('../config/config');

const users = config.define("Users", {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    is_active: Sequelize.BOOLEAN
});

module.exports = users;