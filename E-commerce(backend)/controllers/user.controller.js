const User = require('../models/user.model')

//create user (signup)
exports.createUser = (role)=>{
return async(req, res, next)=>{
    try{
        const {name, email, password, location} = req.body;
        //check if role is correct
        if(!['admin','user'].includes(role)){
            //400:invalid data 
            // console.log('invalid role');
            res.status(400).json({message:`invalid Role`})
            // return next( new AppError(`invalid role ${role} isn't defiend`, 400))
        }
        //check if user exists
        const existing = await User.findOne({email});
        if(existing){
        return res.status(400).json({ message: 'Duplicated email' });     
        }
        //create user
        const user = await User.create({name, email, password,role, location});
        return res.status(201).json({user})
}
catch(err){res.status(500).json({message:`${err.message}`})}
}}
//get specific user aka (Login)
// exports.Login = async(req, res)=>{
//     const {email, password} = req.body;
//     const loggedUser = await User.findOne({email});
//     return res.status(200).json({message:'Login successful'})
// }
//get all users by admin
exports.getUsers = async (req,res)=>{
    const users = await User.find().select('-password')
    //logging the admin id that triggered this function 
    // if(users.length>0) {logger.info(`User Lisiting: ${users.length} by user: ${req.user.id}`)}
    // else{ logger.warn('user collection data is empty')}
    return res.status(200).json(users)
}
//get user data by user for account 
exports.getuserData  = async(req,res)=>{
    const ueserId = req.user._id;
    const userData = await User.find({_id:ueserId}).select('-role');
    return res.status(200).json(userData)

}

