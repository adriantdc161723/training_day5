class Response{
    RESPONSE(status = 0, response = {}, message = ""){
        return {status, response, message};
    }
}

module.exports = Response;