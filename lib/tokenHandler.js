const jwt = require('jsonwebtoken');
const devConfig = require('./config/devConfig')

/** verify and decode token for all users */
function verifyToken(req, res, next) {

    // Fetch authentication token from the header
    let token = req.headers.authorization;

    // verify the token with jwt
    jwt.verify(token, devConfig.secretKey, function (err, decoded) {

        //check token expired then store to black list
        if (err) {
            console.log('error while check authentication=', err)
            return res.send({
                "status": 500,
                "message": "Failed to authenticate token."
            });
        }

        req.email = decoded.email;
        req._id = decoded._id;

        next();
    });
}

module.exports = {
    verifyToken
}