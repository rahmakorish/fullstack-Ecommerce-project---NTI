const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  price: {
    type: Number,
    required: true,
  },
  imgURL: {
    type: String,
    // required: true
  },
  //slug: name without spaces or special chracter to create route (slugifiy package)
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    // type:mongoose.Schema.Types.ObjectId,
    // ref:'category',
    type: String,
    required: true,
    enum:['skin care', 'clothing', 'accessories', 'books', 'food & beverages']
  },
  rating: {
    type: Number,
    // required: true
  },
});
module.exports = mongoose.model("product", productSchema);
