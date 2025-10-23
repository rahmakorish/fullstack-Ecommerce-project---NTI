const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const {mongoose} = require('mongoose')

exports.placeOrder= async(req, res)=>{
      //get user and start session 
        const userId = req.user._id
        // const address = req.user.location.address;
        // console.log(address);
        
        const session = await mongoose.startSession();
        session.startTransaction();
    try{

        //get his cart
        const userCart = await Cart.findOne({user:userId});
        //if he doesn't have cart
        if(!userCart){return res.status(404).json({message:`cart Not found`})}
        //turn cart items to order items? 
        // for(item of userCart.items){
        // userOrder.TotalPrice = userCart.totalItemsPrice
        // console.log(item);
        // userOrder.items = userCart.items;
        // console.log(userOrder.items);
        
    const orderItems = userCart.items.map(item => ({
                product: item.product._id, quantity: item.quantity
    }));

    // TotalPrice: item.product.price
TotalPrice = userCart.totalItemsPrice;

    const newOrder = new Order({user: userId,
    items: orderItems,
    TotalPrice,
    });

    await newOrder.save();

    // Decrease stock
    for (const item of userCart.items) {
    const product = await Product.findById(item.product._id);
    product.stock -= item.quantity;
    await product.save();
    }

    // Empty the userCart
    userCart.items = [];
    userCart.totalPrice = 0;
    await userCart.save();
    await session.commitTransaction();
    session.endSession();
    res.status(201).json(newOrder);


    } 
        catch(err) {
            //roleback 
        await session.abortTransaction()
        session.endSession()
            return res.status(500).json({message:`${err.message}`})}
}
//get user orders by User
exports.getUserOrders = async(req,res)=>{
    try{
    const uesrId = req.user._id;
    const userOrders = await Order.find({user:uesrId}).populate('items.product', 'name quantity price');;
    return res.status(200).json({userOrders})
    }
    catch(err){ return res.status(500).json({message:`${err.message}`})}

}
//get orders by admin 
exports.getOrders = async(req,res)=>{
    try{
    const usersOrders = await Order.find().populate('items.product', 'name quantity price');
    return res.status(200).json(usersOrders)
    }
    catch(err){ return res.status(500).json({message:`${err.message}`})}

}

//change order status by admin
exports.changeStatus = async(req,res)=>{
    try{
    //get order by id
    const orderId = req.params.id
    const newStatus = req.body.status
    
    //get order itself
    const userOrder = await Order.findById(orderId);
    if (!userOrder) {
    return res.status(404).json({ message: "Order not found" });
    }
        userOrder.status = newStatus
        await userOrder.save()
    return res.status(200).json(userOrder.status)
    }
    catch(err){ return res.status(500).json({message:`${err.message}`})}

}
