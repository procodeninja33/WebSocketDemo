const devConfig = require('../../config/devConfig');
const jwt = require('jsonwebtoken');
const userSchema = require('../../models/userSchema');

async function userLogin(req) {

    let query = {
        email: req.body.email,
        password: req.body.password
    }

    return await userSchema.findOne(query).then(async result => {
        if (result) {

            let encodeData = {
                _id: result._id,
                email: result.email
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

async function addUser(req) {

    req.body.status = 'ACTIVE';
    req.body.u_type = 'STUDENT';


    return await userSchema.create(req.body).then(result => {
        return result;
    });
}


async function userList(req) {
    return await userSchema.find({email: { $not: { $eq: devConfig.superAdminConfig.email}}}).sort({ 'createdAt': -1 })
}

module.exports = {
    userLogin,
    addUser,
    userList
}