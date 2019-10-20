const userService = require('./userService');
const userMapper = require('./userMapping');

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
    userLogin,
    userRegister,
    addUser,
    userList
}