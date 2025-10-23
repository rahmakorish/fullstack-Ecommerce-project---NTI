const express = require('express');
const router = express.Router()
const {authenticate} = require('../middlwares/auth.middleware')
const {authorize} = require('../middlwares/Roleauth.middleware');
const {createQuestion, getQuestion, hideQuestion} = require('../controllers/FAQ.controller')

router.post('/createFAQ', authenticate,authorize('admin'),createQuestion);

router.get('/',getQuestion)

router.post('/hideQ', authenticate,authorize('admin'), hideQuestion)


module.exports = router