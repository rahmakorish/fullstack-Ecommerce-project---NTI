const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
category:{
        type:String,
        required: true,
        // enum:['electronics', 'clothing', 'home goods', 'books', 'food & beverages']    
},
subcategory:{
    type:String
}
})

module.exports = mongoose.model('category', CategorySchema);
