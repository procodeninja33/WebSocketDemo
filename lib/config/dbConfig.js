const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/webSocket'


function connectDB(callback) {

    mongoose.connect(dbUrl, { useNewUrlParser: true }, () => {
        console.log('--- Database connection establish successfully ---')
    });
    callback();

}

module.exports = connectDB;