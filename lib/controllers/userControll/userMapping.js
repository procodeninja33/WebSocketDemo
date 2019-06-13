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
    }
}

function errorLogin() {
    return {
        status: 400,
        message: 'There have some issue with login.'
    }
}

function successAddUser(data) {
    return {
        status: 200,
        message: 'Successfully registred.',
        data: data
    }
}

function errorAddUser() {
    return {
        status: 400,
        message: 'There have some issue with registration.',
    }
}

function successUserList(data) {
    return {
        status: 200,
        message: 'user listing successfully.',
        data: data
    }
}

function errorUserList() {
    return {
        status: 400,
        message: 'there have some issue with userListing.'
    }
}

module.exports = {
    successLogin,
    errorLogin,
    invalidLogin,
    successAddUser,
    errorAddUser,
    successUserList,
    errorUserList
}