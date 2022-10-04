const Sequelize = require('sequelize');
const config = require('../config/config');

const tasks = config.define("Tasks", {
    task_name: Sequelize.STRING,
    task_desc: Sequelize.STRING,
    task_day: Sequelize.STRING
});

module.exports = tasks;