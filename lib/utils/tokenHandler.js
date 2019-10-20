const jwt = require('jsonwebtoken');
const devConfig = require('../config/devConfig');
const userSchema = require('../models/userSchema');

/** verify and decode token for users */
function verifyToken(req, res, next) {

    // Fetch authentication token from the header
    let token = req.headers.authorization;

    // verify the token with jwt
    jwt.verify(token, devConfig.secretKey, (err, decoded) => {

        //check token expired then store to black list
        if (err) {
            console.log('error while check authentication=', err)
            return res.send({
                'status': 500,
                'message': 'Failed to authenticate token.',
                'data': {}
            });
        }

        req.usr_email = decoded.usr_email;
        req._id = decoded._id;

        next();
    });
}


/** verify and decode token for SUPER ADMIN */
function verifySuperAdminToken(req, res, next) {

    // Fetch authentication token from the header
    let token = req.headers.authorization;

    // verify the token with jwt
    jwt.verify(token, devConfig.secretKey, async (err, decoded) => {

        //check token expired then store to black list
        if (err) {
            console.log('error while check authentication=', err)
            return res.send({
                'status': 500,
                'message': 'Failed to authenticate token.',
                'data': {}
            });
        }

        req.usr_email = decoded.usr_email;
        req._id = decoded._id;

        let query = {
            usr_email: req.usr_email,
            usr_type: 'ADMIN'
        }
        await userSchema.findOne({ query }).then((userResult) => {
            if (userResult) {
                next();
            } else {
                return res.send({
                    'status': 500,
                    'message': 'You have not permission to access.',
                    'data': {}
                });
            }
        }).catch((err) => {
            return res.send({
                'status': 500,
                'message': 'There have some issue with authentication token.',
                'data': {}
            });
        })

    });
}

module.exports = {
    verifyToken,
    verifySuperAdminToken
}