import express from "express";
import Order from "../models/Order.js";


export const getOrders = async (req,res) =>{
  try{
     const orders = await Order.find({user: req.user._id}).sort({
        createdAt:-1
     }) //sort

     res.json(orders);
        
     
  }catch(error){
    console.error(error);
    res.status(500).json({message:"server error"});
 }

}

//

export const getOrder = async (req,res) =>{
    try{

        const order = await Order.findById(req.params.id).populate(
           "user",
           "name email"
        );

        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.json(order);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});

    }
}