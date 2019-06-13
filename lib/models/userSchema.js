const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    u_type: {
        type: String,
        enum: ['ADMIN','STUDENT'],
        defualt: 'STUDENT'
    },
    name: {
        type: String    
    },
    email: {
        type : String
    },
    password: {
        type: String
    },
    age: {
        type : Number
    },
    phoneNumber: {
        type: Number
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        defualt: 'MALE'
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default:'ACTIVE'
    }
},{
    timestamps:true
});

users = module.exports =  mongoose.model('users', userSchema)