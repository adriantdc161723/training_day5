const UserController = require('../controllers/user.controller');
const UserRouter = require('express').Router();


UserRouter.post('/create-user', async (req, res) => {
    const response = await UserController.createUser(req.body);
    return res.status(response.status).send(response);
});

UserRouter.get('/get-all-users', async (req, res) => {
    const response = await UserController.getAllUsers();
    return res.status(response.status).send(response);
});

UserRouter.post('/get-user-by/:id', async (req, res) => {
    const response = await UserController.getUserByID(req.params.id);
    return res.status(response.status).send(response);
});


module.exports = UserRouter;