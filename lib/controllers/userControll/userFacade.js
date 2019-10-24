const userService = require('./userService');
const userMapper = require('./userMapping');

/** Get user detail by token */
function getUserByToken(req) {
    return userService.getUserByToken(req).then(result => {
        if (result === 1) {
            return userMapper.userNotFound()
        } else if (result) {
            return userMapper.getUserByTokenSuccessMapper(result);
        } else {
            return userMapper.getUserByTokenErrorMapper();
        }
    });
}

/** Frontend :: user Login */
function userLogin(req) {
    return userService.userLogin(req).then(result => {
        if (result === 1) {
            return userMapper.invalidLogin()
        } else if (result) {
            return userMapper.successLogin(result);
        } else {
            return userMapper.errorLogin();
        }
    });
}

/** Frontend :: User Register */
function userRegister(req) {
    return userService.userRegister(req).then(result => {
        if (result === 1) {
            return userMapper.errorUserRegister()
        } else if (result) {
            return userMapper.successUserRegister(result);
        } else {
            return userMapper.errorUserRegister();
        }
    });
}

/** Super Admin ::  Add User */
function addUser(req) {
    return userService.addUser(req).then(result => {
        if (result) {
            return userMapper.successAddUser(result);
        } else {
            return userMapper.errorAddUser();
        }
    });
}


/** Super Admin :: User list */
function userList(req) {
    return userService.userList(req).then(result => {
        if (result) {
            return userMapper.successUserList(result)
        } else {
            return userMapper.errorUserList();
        }
    })
}

module.exports = {
    getUserByToken,
    userLogin,
    userRegister,
    addUser,
    userList
}