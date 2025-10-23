const express = require('express')
const router = express.Router();
const {createUser, getUsers, getuserData} = require('../controllers/user.controller')

const {authorize} = require('../middlwares/Roleauth.middleware')
const {authenticate} =require('../middlwares/auth.middleware')

//admin can get all users
router.get('/', authenticate,authorize('admin'),getUsers)

//user gets his data 
router.get('/account', authenticate, getuserData)


//admin can create another admin
router.post('/createadmin', authenticate,authorize('admin'),createUser('admin'));

//function to signup user to data 
router.post('/signup', createUser('user'));

module.exports = router