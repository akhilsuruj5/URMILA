const express = require('express');
const { sendEmail, sendMentorshipEmail } = require('../controllers/emailController');
const router = express.Router();

router.post('/send-email', sendEmail);
router.post('/send-mentorship-email', sendMentorshipEmail);

module.exports = router;
