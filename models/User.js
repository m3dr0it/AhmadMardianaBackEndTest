const mongoose = require('mongoose');

const User = mongoose.Schema({
    Id : {
        type: String,
        required : true
    }, 
    userName : {
        type : String,
        required : true
    },
    accountNumber : {
        type : Number,
        required : true
    },
    emailAddress : {
        type : String,
        required : true
    },
    identityNumber : {
        type :Number,
        required : true
    }
})

module.exports = mongoose.model('User',User)