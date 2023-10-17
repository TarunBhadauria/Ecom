const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName : {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    images:[
        {
            type:String,
        }
    ]
});

module.exports = mongoose.model("product",productSchema);