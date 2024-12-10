const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, registerForCourse, getEnrolledCourses } = require('../controllers/courseController');

// Define routes
router.get('/api/courses', getCourses);
router.get("/api/courses/:id", getCourseById);
router.post('/api/register/course', registerForCourse);
router.get('/api/registrations/enrolled', getEnrolledCourses);

module.exports = router;
