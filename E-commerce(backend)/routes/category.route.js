const express = require('express');
const router = express.Router();
const {authenticate} = require('../middlwares/auth.middleware')
const {authorize} = require('../middlwares/Roleauth.middleware')
const {CreateNewCategory, getCategory, getAllCatergories}= require('../controllers/category.controller')

//for user search ? //try it better in product controller
// router.get('/search/:searchCategory',authenticate,getCategory)

//admin createds new category 
router.post('/create', authenticate,authorize('admin'),CreateNewCategory)
//get all categories
router.get('/get',getAllCatergories)

module.exports = router