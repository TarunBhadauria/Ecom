const mongoose = require("mongoose");

const orderSchema = new mongoose({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderedOn:{
        type:Date, 
        required:true,
        default:Date.now()
    },
    orderAmount:{
        type:Number,
        required:true
    },
    orderStatus:{
        type:"Sring",
        required:true,
        default:"ordered"
    }
})

module.exports = mongoose.model("Orders",orderSchema);