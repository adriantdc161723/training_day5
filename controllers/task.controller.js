const TaskService = require('../services/task.service');

class TaskController {
    async createTask (requestObject) {
        const response = await TaskService.createTask(requestObject);
        return response;
    }

    async getAllTask () {
        const response = await TaskService.getAllTask();
        return response;
    }

    async getTaskByID (taskID) {
        const response = await TaskService.getTaskByID(taskID);
        return response;
    }

    async queryTask ({offset, limit, sort, order}) {

        const response = await TaskService.queryTask(
            offset ? parseInt(offset) : 0,
            limit ? parseInt(limit) : 5,
            sort ? sort : "id",
            order ? order : "ASC"
            );

        return response;
    }

    async deleteTask (taskID) {

        const response = await TaskService.deleteTask(taskID);
        return response;

    }
}

module.exports = new TaskController();