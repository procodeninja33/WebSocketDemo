function successLogin(data) {
    return {
        status: 200,
        message: 'Login successfully.',
        data: data
    }
}

function invalidLogin() {
    return {
        status: 404,
        message: 'Invalid username password.',
        data: {}
    }
}

function errorLogin() {
    return {
        status: 400,
        message: 'There have some issue with login.',
        data: {}
    }
}

function successAddUser(data) {
    return {
        status: 200,
        message: 'Successfully add user.',
        data: data
    }
}

function successUserRegister(data) {
    return {
        status: 200,
        message: 'Successfully register.',
        data: data
    }
}

function errorAddUser() {
    return {
        status: 400,
        message: 'There have some issue with add user.',
        data: {}
    }
}

function errorUserRegister() {
    return {
        status: 400,
        message: 'There have some issue with registration.',
        data: {}
    }
}

function successUserList(data) {
    return {
        status: 200,
        message: 'User listing successfully.',
        data: data
    }
}

function errorUserList() {
    return {
        status: 400,
        message: 'There have some issue with userListing.',
        data: {}
    }
}

module.exports = {
    successLogin,
    errorLogin,
    successUserRegister,
    errorUserRegister,
    invalidLogin,
    successAddUser,
    errorAddUser,
    successUserList,
    errorUserList
}