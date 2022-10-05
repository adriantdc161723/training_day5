const TaskController = require('../controllers/task.controller');
const TaskRouter = require('express').Router();

TaskRouter.post('/create-task', async (req, res) => {
    const response = await TaskController.createTask(req.body);
    return res.status(response.status).send(response);
});

TaskRouter.get('/get-all-task', async (req, res) => {
    const response = await TaskController.getAllTask();
    return res.status(response.status).send(response);
});

TaskRouter.post('/get-task-by-id/:id', async (req, res) => {
    const response = await TaskController.getTaskByID(req.params.id);
    return res.status(response.status).send(response);
});

TaskRouter.get('/query-tasks', async (req, res) => {
    
    const response = await TaskController.queryTask(req.query);
    return res.status(response.status).send(response);
});

TaskRouter.post('/delete-task-by-id/:id', async (req, res) => {
    const response = await TaskController.deleteTask(req.params.id);
    return res.status(response.status).send(response);
});

module.exports = TaskRouter;