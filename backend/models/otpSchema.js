const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isOtpVerified:{type:Boolean,default:false}
  
},{timestamps:true});

const OTP = mongoose.model("OTP",otpSchema)
module.exports = OTP
