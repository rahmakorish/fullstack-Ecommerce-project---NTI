const cors = require('cors')
const allowedOrigins = process.env.ALLOWEDORIGINS? 
process.env.ALLOWEDORIGINS.split(',').map(o => o.trim()): 
['http://localhost:4200'];

const corsOptions= {
    //check for req origin
    origin:function(origin,cb){
        
        //req isn't from browser (likely Postman)
        if(!origin){return cb(null, true)}
        //req from allowed browsers
    if (allowedOrigins.includes(origin)) {            
        return cb(null,true)}
        else{return cb(new Error('CORS policy prohibties this request'))}
    }

    //allowed methods
    ,methods:['GET','POST','PUT','PATCH','DELETE'],
    //allow cookies and headers
    credentials: true,
    //allowed headers or auth and ones that contain content
    allowedHeaders: ['authorization', 'content-type']

}
module.exports = cors(corsOptions);