const express = require('express');
const { createTestimonial, getTestimonials,updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');

const router = express.Router();

router.post('/admin/testimonials', createTestimonial);

router.get('/admin/testimonials', getTestimonials);
router.patch('/admin/testimonials/:id', updateTestimonial);

router.delete('/admin/testimonials/:id', deleteTestimonial);


module.exports = router;
