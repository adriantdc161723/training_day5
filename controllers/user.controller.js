const UserService = require('../services/user.service');


class UserController{

    async createUser (requestObject) {
        const response = await UserService.createUser(requestObject);
        return response;
    }

    async getAllUsers () {
        const response = await UserService.getAllUsers();
        return response;
    }

    async getUserByID (userID) {
        const response = await UserService.getUserByID(userID);
        return response;
    }
    
}

module.exports = new UserController();