const userService = require('./userService');
const userMapper = require('./userMapping');

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

function addUser(req) {
    return userService.addUser(req).then(result => {
        if(result) {
            return userMapper.successAddUser(result);
        } else {
            return userMapper.errorAddUser();
        }
    });
}

function userList(req) {
    return userService.userList(req).then( result => {
        if(result) {
            return userMapper.successUserList(result)
        } else {
            return userMapper.errorUserList();
        }
    })
}

module.exports = {
    userLogin,
    addUser,
    userList
}