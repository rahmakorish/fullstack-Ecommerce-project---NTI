const mongoose = require('mongoose');
// const { error } = require('winston');

const connectDB = async(req,res)=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongo connected at :${conn.connection.host}`);

    }
    catch(err){
        res.status(500).json({message:''})
        console.log(`${err.message}`);
        
        process.exit(1);
    }
}
module.exports = connectDB