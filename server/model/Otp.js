const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
        email:{
            type:String,
            required:true
        },
        otp:{
            type:Number,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            expires:60*2
        }
});

module.exports = mongoose.model("Otp",otpSchema);