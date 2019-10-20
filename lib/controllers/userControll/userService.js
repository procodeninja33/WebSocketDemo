const devConfig = require('../../config/devConfig');
const jwt = require('jsonwebtoken');
const userSchema = require('../../models/userSchema');

/** Frontend :: user Login */
async function userLogin(req) {

    let query = {
        usr_email: req.body.usr_email,
        usr_password: req.body.usr_password
    }

    return await userSchema.findOne(query).then(async result => {
        if (result) {

            let encodeData = {
                _id: result._id,
                usr_email: result.usr_email
            };
            let token = await jwt.sign(encodeData, devConfig.secretKey, { expiresIn: '1 day' });

            result = result.toObject();
            result['token'] = token;
            return result;

        } else {
            return 1;
        }
    })
}

/** Frontend :: User Register */
async function userRegister(req) {

    req.body.usr_usr_status = 'ACTIVE';
    req.body.usr_type = 'STUDENT';


    return await userSchema.create(req.body).then(result => {
        return result;
    });
}


/** Super Admin ::  Add User */
async function addUser(req) {

    req.body.usr_status = 'ACTIVE';
    req.body.usr_type = 'STUDENT';


    return await userSchema.create(req.body).then(result => {
        return result;
    });
}

/** Super Admin :: User list */
async function userList(req) {

    let query = {
        usr_email: {
            $not: {
                $eq: devConfig.superAdminConfig.usr_email
            }
        }
    }

    let sort = {
        'createdAt': -1
    }
    return await userSchema.find(query).sort(sort)
}

module.exports = {
    userLogin,
    userRegister,
    addUser,
    userList
}