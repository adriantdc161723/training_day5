const Response = require('../utils/response.util');
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


class InfoService extends Response{

    async createInfo (requestObject) {

        try {

            const find = await Infos.findOne({ where: { user_id: requestObject.user_id } });

            if(!find){

                const create = await Infos.create(requestObject);

                return create
                    ?  this.RESPONSE(CREATED, create, CREATED_MESSAGE)
                    : this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);

            } else {

                //update info of user instead of creating one since Info is existing for the user_id
                const update = await Infos.update(requestObject, { where: { user_id: requestObject.user_id } });

                return update
                    ? this.RESPONSE(UPDATE, update, UPDATE_MESSAGE)
                    : this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);

            }

          

        } catch (error) {

            return this.RESPONSE(INTERNAL_SERVER_ERROR, error.message, INTERNAL_SERVER_ERROR_MESSAGE);

        }
    }

}

module.exports = new InfoService();