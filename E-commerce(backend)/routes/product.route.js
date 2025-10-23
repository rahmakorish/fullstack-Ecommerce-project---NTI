const express = require('express')
const router = express.Router()
const upload = require('../middlwares/upload.middleware');

const {getProductBySlug, getProducts, createProduct, getRelatedProducts, getProductsByCategory,
    getProductsCategory
} = require('../controllers/product.controller')
const {authorize} = require('../middlwares/Roleauth.middleware')
const {authenticate} = require('../middlwares/auth.middleware')

//create new product by admin
router.post('/createproduct', authenticate, authorize('admin'), upload.single('imgURL'),createProduct)
//get product by slug (search)
router.get('/getproducts/:slug',getProductBySlug)
// //get products by searching categoryId ==> not working :( couldn't link product schema to category schema properly
// router.post('/getcategory/:Id',getProductsByCategory)

//get products by searching category name from enum 
router.get('/getcategory/:category',getProductsCategory)

//get products (general browsing)
router.get('/getproducts',getProducts)
//get relate products
router.get('/related/:slug',getRelatedProducts)

module.exports = router 