const express = require("express");
const Orders = require("../model/Orders");


exports.createOrder = async (req, res) => {

    try {
        const { userId, totalAmount, items } = req.body;

        if (!userId || !amount || !items) {
            return res.status(404).json({
                success: false,
                response: "All fields are mandatory"
            });
        }

        const createdOrder = await Orders.create({ userId, items, orderAmount: totalAmount });

        return res.status(200).json({
            success:false,
            message:"Order placed successfully",
            response:createdOrder
        });

    }catch(error){
        console.log("Error while placing order : ",error);
        return res.status(500).json({
            success:false,
            message:"Someting went wrong while placing order"
        })
    }

}

exports.getOrders = async(req,res)=>{
    try{
        const {userId} = req.body;

        const userOrders = await Orders.find({userId}).populate("product").exec();

        return res.status(200).json({
            success:true,
            orders:userOrders,
            message:"Orders fetched successfully"
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while getting orders"
        });
    }
}