const mongoose = require('mongoose');


function connectDB(callback) {
    
    mongoose.connect('mongodb://localhost:27017/webSocket', { useNewUrlParser: true }, () => {
        console.log('--- Database connection establish successfully ---')
    });
    callback();

}

module.exports = connectDB;