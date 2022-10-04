const InfoService = require('../services/info.service');


class InfoController{

    async createInfo (requestObject) {
        const response = await InfoService.createInfo(requestObject);
        return response;
    }
    
}

module.exports = new InfoController();