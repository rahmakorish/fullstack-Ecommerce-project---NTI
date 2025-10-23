const express = require('express');
const router = express.Router()
const {getUserOrders, placeOrder, getOrders, changeStatus} = require('../controllers/order.controller')
const {authenticate} = require('../middlwares/auth.middleware')
const {authorize} = require('../middlwares/Roleauth.middleware')


router.get('/getorder', authenticate, getUserOrders)

router.get('/getallorders', authenticate, authorize('admin'), getOrders)

router.post('/placeorder', authenticate, placeOrder)

router.post('/updatestatus/:id', authenticate, authorize('admin'), changeStatus)

module.exports = router 