const express = require('express');
const { getUser } = require('../controllers/userController'); 
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.get('/user', authenticateToken, getUser);

module.exports = router;
