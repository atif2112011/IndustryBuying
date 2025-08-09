const express = require('express');
const router = express.Router();
const { registerUser, loginUser, check, sendOTP, verifyOTP, verifyAuth, registerGoogleUser, LogoutUser,forgotPassword,resetPassword, changePassword } = require('../controllers/authController');
const authMiddleware = require('../middlewares/Auth');




// @route POST /register
router.post('/register',registerUser);

router.post('/register-google',registerGoogleUser);

// @route POST /login
router.post('/login', loginUser);



router.get('/verify-auth',verifyAuth);

router.post('/check',check)

router.post("/sendOTP", sendOTP);

router.post("/verifyOTP", verifyOTP);

router.get("/logout",LogoutUser)

router.post("/forgot-password",forgotPassword );

router.post("/reset-password/:token", resetPassword);

router.post("/change-password",authMiddleware, changePassword);

module.exports = router;
