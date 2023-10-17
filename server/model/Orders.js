const mongoose = require("mongoose");

const orderSchema = new mongoose({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[
        {
            product_id :{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:string,
                required:true,
                default:1,
                unitPrice:{
                    type:Number,
                    required:true
                },
                totalPrice:{
                    type:Number,
                    required:true
                }
            }
        }
    ],
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