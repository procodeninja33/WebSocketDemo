const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    usr_type: {
        type: String,
        enum: ['ADMIN', 'STUDENT'],
        defualt: 'STUDENT'
    },
    usr_name: {
        type: String
    },
    usr_email: {
        type: String
    },
    usr_password: {
        type: String
    },
    usr_age: {
        type: Number
    },
    usr_phoneNumber: {
        type: Number
    },
    usr_gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        defualt: 'MALE'
    },
    usr_status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    usr_delete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

users = module.exports = mongoose.model('users', userSchema)