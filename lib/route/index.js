const userController = require('../controllers/userControll/userRoute');
const tokenHandler = require('../utils/tokenHandler');

module.exports = function (app) {

    app.use('/api/v1/', [userController]);

}