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
// TTL index to delete document 24 hours after creation
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

const OTP = mongoose.model("OTP",otpSchema)
module.exports = OTP
