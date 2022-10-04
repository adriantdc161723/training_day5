const users = require('../models/Users.model');
const infos = require('../models/Infos.model');
const tasks = require('../models/Tasks.model');


//Associations

//Has Many
users.hasMany(tasks, {
    foreignKey: "user_id",
    as: "tasks"
});

users.hasOne(infos, {
    foreignKey: "user_id",
    as: "user_info"
});

//Belongs to
tasks.belongsTo(users, {
    foreignKey: "user_id",
    as: "user_details"
})

module.exports = {users, infos, tasks};