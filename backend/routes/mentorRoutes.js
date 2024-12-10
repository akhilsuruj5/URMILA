const express = require('express');
const { registerMentor, registerMentorship } = require('../controllers/mentorController');

const router = express.Router();

router.post('/registermentor', registerMentor);
router.post('/api/register/mentorship', registerMentorship);

module.exports = router;
