const userRouter = require("express").Router();
const userFacade = require('./userFacade');
const responseHandler = require('../../responseHandler');
const tokenHandler = require('../../tokenHandler');

userRouter.route('/login')
    .post([], (req, res) => {
        userFacade.userLogin(req)
            .then(response => responseHandler.successHandler(res, response))
            .catch(err => responseHandler.errorHandler(res, err));
    });


userRouter.route('/addUser')
    .post([], (req, res) => {
        userFacade.addUser(req)
            .then(response => responseHandler.successHandler(res, response))
            .catch(err => responseHandler.errorHandler(res, err));
    });


userRouter.route('/userList')
    .get([tokenHandler.verifyToken], (req, res) => {
        userFacade.userList(req)
            .then(response => responseHandler.successHandler(res, response))
            .catch(err => responseHandler.errorHandler(res, err));
    });


module.exports = userRouter
