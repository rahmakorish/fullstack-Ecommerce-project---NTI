const FAQ = require('../models/FAQ.model');

//create new question on dashboard by admin => authorize in route **
exports.createQuestion = async(req, res)=>{
    try{
    //get the data
    const {question, answer} = req.body;
    const newQuestion = await FAQ.create({question, answer})
    return res.status(200).json(newQuestion)}
    catch(err){
        res.status(500).json({message:`${err.message}`})
    }
}

//retrive all questions to display 
exports.getQuestion = async(req,res)=>{
    try{
    const faqs = await FAQ.find();
    return res.status(200).json(faqs)
}
    catch(err){
    return res.status(500).json({message:`${err.message}`})
    }
}

exports.hideQuestion = async(req, res)=>{
    try{
        const id = await req.body._id
        // console.log(id);
        
        const question = await FAQ.findById(id);
        question.isHidden = !Boolean(question.isHidden)
        await question.save()
        // console.log(question.isHidden);        
        res.status(200).json(question)
    }
    catch(err){
        res.status(500).json({message:`${err.message}`})
    }
}
