const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
{
product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product',
        required: true
    },
    quantity:{
        type:Number,
        min:1,
        default:1
    }

})
const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[orderItemSchema],
    status:{
        type: String,
        enum:['pending', 'shipped', 'delivered', 'rejected', 'cancelled'],
        default: 'pending'
    }
    , 
    TotalPrice:{
        type:Number,
        required:true
    },
    orderedAt: {
        type: Date,
        default:Date.now,
        immutable:true,
    },  
    shippingAddress: {
    type: String,
    // required: true
    },
},{
    timestamps: true
}
)
module.exports = mongoose.model('order', orderSchema)