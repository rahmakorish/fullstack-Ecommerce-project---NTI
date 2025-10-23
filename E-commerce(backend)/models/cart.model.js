const mongoose = require('mongoose');


const cartItemSchema = new mongoose.Schema(
{
product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product',
        required: true
    },
quantity:{
        type:Number,
        required:true,
        min:1,
        default:1
    },
    isremoved:{
            type:Boolean,
            default: false
        }
}
)

// required : user , cart items (produxct & quantity)

const cartSchema = new mongoose.Schema(
    {
    //user owner of cart
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    //items within cart (optional) array of items
    items:[cartItemSchema] ,
    
    totalItemsPrice:{
        type:Number,
        default:0
    },
    //refrence to updated price later 
    // placedAt: {
    //     type: Date,
    //     default:Date.now
    // }
},{
    timestamps: true
}
)
module.exports = mongoose.model('Cart', cartSchema);

