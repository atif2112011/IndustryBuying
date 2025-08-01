const express = require("express");
const {sendOtpEmail, sendEmailNormal } = require("../controllers/mailController");


const router = express.Router();

router.post("/send-email", sendEmailNormal);

router.post("/send-otp-email",sendOtpEmail );

module.exports = router;
