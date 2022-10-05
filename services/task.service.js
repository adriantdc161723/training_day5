const Response = require('../utils/response.util');

const Tasks = require('../models/Tasks.model');
const Users = require('../models/Users.model');
const Infos = require('../models/Infos.model');

//response constants and messages
const {
    OK, 
    NOTFOUND, 
    BADREQUEST, 
    CREATED, 
    UPDATE, 
    INTERNAL_SERVER_ERROR
} = require('../utils/constants.util');

const {
    OK_MESSAGE, 
    NOTFOUND_MESSAGE, 
    BADREQUEST_MESSAGE, 
    CREATED_MESSAGE, 
    UPDATE_MESSAGE, 
    INTERNAL_SERVER_ERROR_MESSAGE
} = require('../utils/message.util');

class TaskService extends Response{
    async createTask (requestObject) {
        
        try {
            
            const create = await Tasks.create(requestObject);

            if(create){
                const response = this.RESPONSE(OK, create, OK_MESSAGE);
                return response;
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }
        
    }

    async getAllTask () {

        try {
            
            const find = await Tasks.findAll({
                include: {
                        model: Users,
                        as: "user_details",
                        include: { 
                            model: Infos, 
                            as: "user_info",
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        },
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
                
            });

            if(find){
                const filteredActiveTasks = find.filter( task => task.is_active );
                const response = this.RESPONSE(OK, filteredActiveTasks, OK_MESSAGE);
                return response;
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }

    }

    async queryTask (offset, limit, sort, order) {
        try {
            
            const find = await Tasks.findAll({
                offset,
                limit,
                sort,
                order: [[sort, order]],
                include: {
                        model: Users,
                        as: "user_details",
                        include: { 
                            model: Infos, 
                            as: "user_info",
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        },
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
                
            });

            if(find){
                const response = this.RESPONSE(OK, find, OK_MESSAGE);
                return response;
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    async getTaskByID (taskID) {

        try {
            
            const find = await Tasks.findOne({
                where: { id: taskID },
                include: {
                        model: Users,
                        as: "user_details",
                        include: { 
                            model: Infos, 
                            as: "user_info",
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        },
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
                
            });

            if(find.is_active){
                const response = this.RESPONSE(OK, find, OK_MESSAGE);
                return response;
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }

    }

    async deleteTask (taskID) {
        try {
            
            const update = await Tasks.update({ is_active: false }, {where: { id: taskID } });

            if(update){
                return this.RESPONSE(OK, update, `task: ${taskID} deleted`);
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

}

module.exports = new TaskService();