const express = require('express');
const router = express.Router();
const {getCart, createCart, removeItem}= require('../controllers/cart.controller')
const {authenticate} = require('../middlwares/auth.middleware')

router.get('/',authenticate, getCart);
router.post('/addtocart', authenticate, createCart)
router.delete('/clearitem/:id', authenticate, removeItem)

module.exports = router


