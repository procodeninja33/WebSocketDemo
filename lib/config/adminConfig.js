const userSchema = require('../models/userSchema');

module.exports = function superAdminConfigur(admin) {
    userSchema.findOne({email: admin.email}).then(result => {
        if(result) {
            console.log('--- Super Admin alredy configred ---');
        } else {
            userSchema.create(admin).then( data => {
                if(data) {
                    console.log('--- Super Admin configration successfull ---');
                } else {
                    console.log('--- Issue with super admin configration ---');
                }
            })
        }
    })
}