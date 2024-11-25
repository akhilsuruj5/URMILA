const express = require('express');
const { registerForMentorship } = require('../controllers/registerController');

const router = express.Router();

// POST endpoint for registering for one-to-one mentorship
router.post('/register/mentorship', registerForMentorship);

module.exports = router;
