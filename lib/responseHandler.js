function _sendResponse(res, rslt) {
    return res.send(rslt);
}

function successHandler(res, result) {
    var response = {
        status: result.status,
        message: result.message,
        data: result.data
    }
    _sendResponse(res, response);
}


function errorHandler(res, result) {
    var response = {
        status: result.status,
        message: result.message
    }
    _sendResponse(res, response);
}


module.exports = {
    successHandler,
    errorHandler
}