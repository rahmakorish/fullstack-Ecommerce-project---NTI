const jwt = require('jsonwebtoken')
const User = require('../models/user.model');

exports.authenticate = async (req,res,next)=>{
//check if user have token aka loggedin from autherization header in request
const authHeaders = req.headers.authorization;
//check if user have a token at all 
if(!authHeaders?.startsWith('Bearer ')){
    return res.status(401).json({message:"no Token provided"})
}
//token exists
const token= authHeaders.split(' ')[1];
//find if token from my site
try{
    //verify throws error WITH expired or unknown decode 
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select('-password')
    // console.log(user);
if(!user){
    res.status(404).json({message:'User not found'})
}
//send user in request to the next following middleware 
req.user = user;
next();
}
catch(err){ return res.status(403).json({message:'Token is invalid or Expired'})}

}