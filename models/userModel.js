const mongoose = require('mongoose')

const userModelSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type :  String,
        required : true
    },
    phn_no : {
        type : Number,
        required : true
    }
})



module.exports = mongoose.model('userModel',userModelSchema)