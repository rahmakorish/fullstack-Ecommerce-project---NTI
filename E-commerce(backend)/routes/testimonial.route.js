const express = require('express');
const router = express.Router();
const {createTestimonial, getTestimonial, hideReview} = require('../controllers/testimonial.controller')
const {authenticate} = require('../middlwares/auth.middleware');
const { authorize } = require('../middlwares/Roleauth.middleware');

router.post('/createTestiominal', authenticate,authorize('admin'),createTestimonial)
router.get('/', getTestimonial)
router.post('/hide', authenticate,authorize('admin'), hideReview)

module.exports = router