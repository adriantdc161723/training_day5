const Sequelize = require('sequelize');
const config = require('../config/config');

const tasks = config.define("Tasks", {
    task_name: Sequelize.STRING,
    tast_desc: Sequelize.STRING,
    tast_day: Sequelize.STRING
});

module.exports = tasks;