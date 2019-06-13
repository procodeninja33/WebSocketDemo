const userController = require('../controllers/userControll/userRoute');
const tokenHandler = require('../tokenHandler');

module.exports = function (app) {

    app.use('/api/v1/', [userController]);

}