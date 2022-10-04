const InfoController = require('../controllers/info.controller');
const InfoRouter = require('express').Router();


InfoRouter.post('/create-info', async (req, res) => {
    const response = await InfoController.createInfo(req.body);
    return res.status(response.status).send(response);
});

module.exports = InfoRouter;