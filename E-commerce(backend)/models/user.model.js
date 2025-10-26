const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

// const locationSchema = new mongoose.Schema({
//     location:{ 
//         type:[{
//         label:{ type: String},
//         address: {type:String, required: true}
//     }], validate: {
//         validator: function(arr){
//         return this.role !== 'user' || arr.length> 0;
//         }, message: 'user must have at least 1 primary location'
//     }
//     },
// })
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        // match:'/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/'
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['admin', 'user'],
        default:'user'
    },
    location: {
    type: [{
      label: String,
      address: { type: String, required: true }
    }],
    validate: {
      validator(arr) {
        return this.role !== "user" || arr.length > 0;
      },
      message: "User must have at least one location."
    }
  }, 
    image:{
        type:String,

    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'cart'
    }
})

//encryption of password
userSchema.pre('save', async function(next){
if (!this.isModified('password')){next}
this.password = await bcrypt.hash(this.password, 12);
next();
})

//check for password match using compare from bcrypt
userSchema.methods.correctPass = async function(inputpass){
    return await bcrypt.compare(inputpass, this.password);
}

module.exports = mongoose.model('User', userSchema);



