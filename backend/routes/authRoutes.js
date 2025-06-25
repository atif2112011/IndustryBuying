const express = require('express');
const router = express.Router();
const { registerUser, loginUser, check, sendOTP, verifyOTP, verifyAuth } = require('../controllers/authController');




// @route POST /register
router.post('/register',registerUser);

// @route POST /login
router.post('/login', loginUser);



router.get('/verify-auth',verifyAuth);

router.post('/check',check)

router.post("/sendOTP", sendOTP);

router.post("/verifyOTP", verifyOTP);

module.exports = router;
