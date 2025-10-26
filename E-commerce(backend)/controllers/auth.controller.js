const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const signtoken = (user)=>{
    return jwt.sign(
        //SENT DATA TO FRONT END
        {id:user._id, name:user.name, role:user.role, location:user.location, image:user.image},
        //KEY
        process.env.JWT_SECRET,
        //EXPIRY DATE OF TOKEN
        {expiresIn:process.env.JWT_EXPIRES_IN}
    )
}

exports.login = async(req,res)=>{
        //GET doesn't have body so parameter are sent in url which is insecure
        //that's why we use POST with it's body instead
        const{email, password} = req.body;
        const user = await User.findOne({email});
        //check if user exists
        if(!user){
            return res.status(404).json({message:'incorrect email or password'})
        }
        const isCorrect = await user.correctPass(password)
        
        if(isCorrect){
            const token= signtoken(user)
            res.status(200).json({message:'login successful', data: token})
        
        }

        else{res.status(404).json({message:'incorrect email or password'})}

}