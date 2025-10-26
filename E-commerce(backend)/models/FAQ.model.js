const mongoose = require('mongoose')

const FQASchema = new mongoose.Schema({
    //an array of questions objects
        question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    isHidden:{
            type:Boolean,
            default: false
        }
    
})
module.exports = mongoose.model("FAQ", FQASchema);