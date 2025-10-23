const Category = require('../models/category.model');
// const Product = require('../models/product.model')
// const mongoose = require('mongoose')
exports.CreateNewCategory= async(req, res)=>{
try{    const {category, subcategory} = req.body;
    //check if subcategory already exists in category
        const exists = await Category.findOne({ category: category, subcategory: subcategory });
        if (exists) {
            return res.status(409).json({ message: `${subcategory} in ${category} already exists` });
        }
    //if doesn't exist create it
    const addedCategory = await Category.create({category:category, subcategory:subcategory})
    return res.status(200).json(addedCategory)
}
catch(err){return res.status(500).json({ message: err.message })};
}

// exports.getCategory = async(req,res)=>{
//     try{const 
//         {searchCategory} = req.params
//     // const category = await Product.find({category:searchCategory});
//     // return res.status(200).json(category)}
//     let categoryDoc = null;
//         if (mongoose.Types.ObjectId.isValid(searchCategory)) {
//             categoryDoc = await Category.findById(searchCategory);
//         }
//         if (!categoryDoc) {
//             categoryDoc = await Category.findOne({ category: new RegExp(`^${searchCategory}$`, 'i') });
//         }

//         if (!categoryDoc) return res.status(404).json({ message: 'Category not found' });

//         const products = await Product.find({ category: categoryDoc._id }).populate('category');
//         return res.status(200).json(products);
//     }
//     catch(err){return res.status(500).json({ message: err.message });}
// }

exports.getAllCatergories = async(req,res)=>{
    try{
        const allCategories = await Category.find()
        res.status(200).json(allCategories)

    }
    catch(err){return res.status(500).json({ message: err.message })};

}