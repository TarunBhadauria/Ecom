const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    orders:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Orders"
    },
    
});

module.exports = mongoose.model("user", userSchema );