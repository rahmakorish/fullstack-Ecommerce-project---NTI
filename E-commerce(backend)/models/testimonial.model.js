const mongoose = require('mongoose')

const testimonialSchema = mongoose.Schema(
    {
    
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        text:{
            type:String,
            required: true,
            minlength: 5
        },
        isHidden:{
            type:Boolean,
            default: false
        }
        
})


module.exports = mongoose.model('testimonial', testimonialSchema)