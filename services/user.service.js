const Response = require('../utils/response.util');
const Users = require('../models/Users.model');
const Infos = require('../models/Infos.model');
const Task = require('../models/Tasks.model');

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
const { and } = require('sequelize');


class UserService extends Response{

    async createUser (requestObject) {

        try {

            const create = await Users.create(requestObject);

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

    async getAllUsers () {

        try {

            const find = await Users.findAll({
                include: [
                    {
                        model: Infos,
                        as: "user_info",
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: Task,
                        as: "tasks",
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"]
                        }
                    }

                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });

            if(find){
                const filteredActiveUser = find.filter( user => user.is_active );
                const response = this.RESPONSE(OK, filteredActiveUser, OK_MESSAGE);
                return response;
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }

    }

    async getUserByID (userID) {

        try {

            const find = await Users.findOne({
                where: { id: userID },
                include: [
                    {
                        model: Infos,
                        as: "user_info",
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: Task,
                        as: "tasks",
                        attributes: {
                            exclude: ["id", "createdAt", "updatedAt"]
                        }
                    }

                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });

            if(find.is_active){
                return this.RESPONSE(OK, find, OK_MESSAGE);
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }

    }

    async deactUser (userID) {

        try {

           const update = await Users.update({ is_active: false }, { where: { id: userID } });

           if(update){
                return this.RESPONSE(OK, update, `user: ${userID} deleted`);
           } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
           }

        } catch (error) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);
        }

    }


}

module.exports = new UserService();