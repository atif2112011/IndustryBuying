const express = require('express');
const router = express.Router();
const { registerUser, loginUser, check, sendOTP, verifyOTP } = require('../controllers/authController');
const  verifyAuthToken  = require('../middlewares/Auth');
const { getUserProfile } = require('../controllers/authController');

// @route POST /register
router.post('/register',registerUser);

// @route POST /login
router.post('/login', loginUser);

router.get('/profile/:id',verifyAuthToken,getUserProfile);

router.get('/verify-auth',verifyAuthToken);

router.post('/check',check)

router.post("/sendOTP", sendOTP);

router.post("/verifyOTP", verifyOTP);

module.exports = router;
