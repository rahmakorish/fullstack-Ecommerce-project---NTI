//configure env
const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const port = process.env.PORT
const path = require('path');
//DB connection:
const connectDB = require('./config/DB.config')
connectDB()
//cors:
const corsMiddleWare = require('./middlwares/cors.middleware')
app.use(corsMiddleWare)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })
app.use(express.json());
//login
app.use("/api/auth", require("./routes/auth.route"));


app.use("/api/user", require("./routes/user.route"));
app.use('/api/product', require('./routes/product.route'))
app.use('/api/cart', require('./routes/cart.route'))
app.use("/api/category", require("./routes/category.route"))
app.use('/api/order', require("./routes/order.route"))
app.use("/api/FAQ", require("./routes/FAQ.route"))
app.use("/api/testimonial", require("./routes/testimonial.route"))

app.listen(port,()=>{console.log(`server connected successfully ${port}`);
})