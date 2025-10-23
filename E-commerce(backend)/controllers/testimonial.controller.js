const { log } = require('winston');
const Testimonial = require('../models/testimonial.model');
const USer = require('../models/user.model')
//create new 
exports.createTestimonial = async(req,res)=>{
    try{
        //user not name && check if user exists
        const {user, text} = req.body;
        console.log(text);
        
        const newTestimonial = await Testimonial.create( {user, text});
        res.status(200).json(newTestimonial)
    }

    catch(err){
        res.status(500).json({message:`${err.message}`})}
}

//retrive all to display
exports.getTestimonial = async(req,res)=>{
    try{
        const testimonials = await Testimonial.find().populate('user','name');
        res.status(200).json(testimonials)
    }
    catch(err){
        res.status(500).json({message:`${err.message}`})
    }
}
//admin can select specific review to display
exports.hideReview = async(req, res)=>{
    try{
        const id = await req.body._id
        // console.log(id);
        
        const review = await Testimonial.findById(id);
        review.isHidden = !Boolean(review.isHidden)
        await review.save()
        console.log(review.isHidden);
        
        // console.log(review);
        
        res.status(200).json(review)
    }
    catch(err){
        res.status(500).json({message:`${err.message}`})
    }
}