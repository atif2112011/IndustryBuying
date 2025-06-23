const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { verifyAuthToken } = require('../controllers/authController');
const { getUserProfile } = require('../controllers/authController');

// @route POST /register
router.post('/register', registerUser);

// @route POST /login
router.post('/login', loginUser);

router.get('/profile',getUserProfile);

router.get('/verify-auth',verifyAuthToken);

module.exports = router;
