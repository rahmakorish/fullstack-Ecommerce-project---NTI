const Product = require('../models/product.model');
const mongoose = require('mongoose');
const Category = require('../models/category.model');

exports.createProduct = async(req,res)=>{
    const {name,description,price,slug,stock, category, rating} = await req.body;
    const imgURL = req.file ?req.file.filename:undefined;
    const existingProduct = await Product.findOne({slug})
    if(existingProduct){ return res.status(400).json({message:`product with slug: ${slug} already exists`})}
    const newProduct = await Product.create({name,description,price,slug,stock, category, imgURL,rating})
    return res.status(201).json({message:`${newProduct.name} created successfully`, data:newProduct})
}

exports.getProductBySlug = async(req,res)=>{
    try{
        const slug = req.params.slug;
        const foundProduct = await Product.findOne({slug})
        // console.log(foundProduct);
        
        return res.status(200).json({message:`get product by slug "${slug}"`, data:foundProduct})
    }
    catch(err){ return res.status(500).json({message:`${err.message}`})}
}

exports.getProducts = async(req,res)=>{ 
try { 
    const allProducts = await Product.find({});
    // console.log(allProducts);
    return res.status(200).json({message:`${allProducts} were returned`, data:allProducts})}
    catch(err){return res.status(500).json({message:`${err.message}`})}
}
//get products based on category 
exports.getProductsCategory = async(req,res)=>{
    try{const searchCategory = req.params.category;
    const labelledProducts = await Product.find({category:searchCategory})
    return res.status(200).json(labelledProducts)
}
catch(err){return res.status(500).json({message:`${err.message}`})}

}
//get simillar products
exports.getRelatedProducts = async(req,res)=>{
    try{
        const productSlug = req.params.slug;
        const product = await Product.findOne({productSlug})
// category:product.category,
        // console.log(productSlug);
        const relatedProducts = await Product.find({slug:{$ne:product}})
        // console.log(relatedProducts);
        
        return res.status(200).json({data:relatedProducts})
    }
    catch(err){ return res.status(500).json({message:`${err.message}`})}
}
//get products via category filter 
exports.getProductsByCategory = async(req,res)=>{
    try{
        // const categoryId = req.body.categoryId;
        const categoryId = req.params.Id
        if (!categoryId) return res.status(400).json({ message: 'categoryId is required' });

        console.log(categoryId);
        // const categoryProducts = await Product.find({ category: new mongoose.Types.ObjectId(categoryId) });

        const categoryProducts = await Product.find({category: categoryId})
        // category:product.category,
        console.log(categoryProducts);
        
        return res.status(200).json(categoryProducts)
    }
    catch(err){ return res.status(500).json({message:`${err.message}`})}
}



//get product info at placing order 

