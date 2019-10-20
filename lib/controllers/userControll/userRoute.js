const userRouter = require("express").Router();
const userFacade = require('./userFacade');
const responseHandler = require('../../utils/responseHandler');
const tokenHandler = require('../../utils/tokenHandler');

/** Frontend :: user Login */
userRouter.route('/login')
    .post([], (req, res) => {
        userFacade.userLogin(req)
            .then(response => responseHandler.successHandler(res, response))
            .catch(err => responseHandler.errorHandler(res, err));
    });

/** Frontend :: User Register */
userRouter.route('/register')
    .post([], (req, res) => {
        userFacade.userRegister(req)
            .then(response => responseHandler.successHandler(res, response))
            .catch(err => responseHandler.errorHandler(res, err));
    });


/** Super Admin ::  Add User */
userRouter.route('/addUser')
    .post([], (req, res) => {
        userFacade.addUser(req)
            .then(response => { responseHandler.successHandler(res, response) })
            .catch(err => responseHandler.errorHandler(res, err));
    });


/** Super Admin :: User list */
userRouter.route('/userList')
    .get([tokenHandler.verifyToken], (req, res) => {
        userFacade.userList(req)
            .then(response => responseHandler.successHandler(res, response))
            .catch(err => responseHandler.errorHandler(res, err));
    });


module.exports = userRouter
