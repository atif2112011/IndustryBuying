const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const otpGenerator = require("otp-generator");
const OTP = require("../models/otpSchema");
const { sendOtpEmail } = require("./mailController");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
// const { Error } = require("mongoose");

//Register a new user
const registerUser = async (req, res, next) => {
  //TODO : check if user already exists, if not create a new user, store password as hashed value, and send a response back to the client.
  try {
    const { name, email, password, phone,gstin } = req.body;
    if (!name || !email || !password || !phone)
      throw new Error(
        " Check if all fields are present:Name, Email, Password and Phone "
      );



    if (!validator.isEmail(email)) throw new Error("Invalid Email");

    const existingUser = await User.findOne({ email: email });

    if (existingUser) throw new Error(" User Already Exists. ");

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) throw new Error(" Error in hashing Password ");

    const otpInfo = await OTP.findOne({ email: email });

    if (!otpInfo?.isOtpVerified) throw new Error("OTP verification Not Found");

    const savedUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      isVerified: true,
      gstin
    });
    await OTP.deleteMany({ email: email }); // optional if not tracking verified OTPs

    return res.status(200).json({
      message: "User Registered Successfully.",
      success: true,
      user: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

//Register Google User
const registerGoogleUser = async (req, res, next) => {
  //TODO : check if user already exists, if not create a new user, store password as hashed value, and send a response back to the client.
  try {
    const { name, email, pfp, googleId, phone, gstin } = req.body;
    if (!name || !email || !googleId || !phone)
      throw new Error(
        " Check if all fields are present:Name, Email, GoogleId and Phone "
      );

    if (!validator.isEmail(email)) throw new Error("Invalid Email");

    const existingUser = await User.findOne({ email: email });

    if (existingUser) throw new Error(" User Already Exists. ");


    const otpInfo = await OTP.findOne({ email: email });

    if (!otpInfo?.isOtpVerified) throw new Error("OTP verification Not Found");

    const savedUser = await User.create({
      name,
      email,
      pfp,
      googleId,
      isGoogleLogin: true,
      phone,
      isVerified: true,
      gstin
    });
    await OTP.deleteMany({ email: email }); // optional if not tracking verified OTPs

    return res.status(200).json({
      message: "User Registered Successfully.",
      success: true,
      user: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

//Login an existing user
const loginUser = async (req, res, next) => {
  //If user does not exist, send an error response.
  // If password is correct, generate a JWT token and send it back to the client.
  // If password is incorrect, send an error response.
  try {
    const { email, password } = req.body;
    // console.log("req.body", req.body);

    if (!email || !password) throw new Error(" fill all details ");

    if (!validator.isEmail(email)) throw new Error("Invalid Email Format");

    const isExist = await User.findOne({ email });

    //TODO : check if user exists, if yes, compare password with hashed password, and send a response back to the client.
    if (!isExist) throw new Error("User Not Signed Up ");
    if(isExist.isGoogleLogin) throw new Error("Google Account Found! Log In Using Google");
  

    if(isExist.isBlock) throw new Error("Account Blocked! Contact Support");
    // Password compare
    const isPassword = await bcrypt.compare(password, isExist.password);

    if (!isPassword) throw new Error("Invalid Credentials ");

    // generate token
    const token = jwt.sign(
      { userId: isExist?._id, role: isExist?.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    if (!token)
      throw new Error("Error in Token Generation");

    return res
      .cookie("Token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production"?true:false, // Set to true in production
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "User Logged In Successfully ",
        success: true,
      });
  } catch (error) {
    next(error);
  }
};



// /auth/check
const check = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw new Error("Enter Phone and Email ");

  

    if (!validator.isEmail(email)) throw new Error("Invalid Email");

    const user = await User.findOne({ $or: [{ email }] });

    if (user) throw new Error("User Already Exist with this Email");

    return res
      .status(200)
      .json({ message: "User Not Signed Up", success: true });
  } catch (error) {
    next(error);
  }
};

///auth/sendOTP
const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Please Enter Email");

    if (!validator.isEmail(email)) throw new Error("Invalid Email");

    // OTP generate
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log(`otp generated for email ${email} : `, otp);
    const hashedOtp = await bcrypt.hash(otp, 10);

    // saved OTP in DB
    const newExpiry = Date.now() + 5 * 60 * 1000;

    const otpInfo = await OTP.create({
      email,
      otp: hashedOtp,
      expiresAt: newExpiry,
    });
    if(!otpInfo) throw new Error("Error in saving OTP");
    
    await sendEmail({
      to: email,
      subject: "OTP Verification",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Our Platform</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px; margin: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
          <tr>
            <td style="background-color: #4F46E5; padding: 30px; color: white; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">👋 Welcome to [Your Company Name]</h1>
              <p style="margin: 10px 0 0; font-size: 16px;">Let’s get you started</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; color: #333;">
                Hi <strong>{{name}}</strong>,
              </p>
              <p style="font-size: 16px; color: #333;">
                Your account has been successfully created. Use the OTP below to log in and access your dashboard.
              </p>
              <div style="margin: 20px 0; text-align: center;">
                <span style="display: inline-block; font-size: 24px; background-color: #E0E7FF; color: #1E3A8A; padding: 15px 30px; border-radius: 8px; font-weight: bold; letter-spacing: 4px;">
                  {${otp}}
                </span>
              </div>
              <p style="font-size: 14px; color: #666;">
                This OTP is valid for 10 minutes. Please do not share it with anyone.
              </p>
              <p style="font-size: 16px; color: #333;">
                Need help? Contact our support team at <a href="mailto:support@yourcompany.com" style="color: #4F46E5; text-decoration: none;">support@yourcompany.com</a>.
              </p>
              <p style="font-size: 16px; color: #333;">
                Cheers,<br />
                The [Your Company Name] Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #F3F4F6; text-align: center; padding: 20px; font-size: 12px; color: #888;">
              © {{year}} [Your Company Name]. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,})
  


    res.status(200).json({ message: "OTP send Successfully", success: true });
  } catch (error) {
    next(error);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { otp, email } = req.body;

    if (!otp || !email) throw new Error("OTP or Email is missing");

    const savedOTP = await OTP.findOne({ email, isOtpVerified: false }).sort({
      createdAt: -1,
    });

    if (!savedOTP) throw new Error("Invalid OTP");
    console.log(savedOTP);

    // compare OTP
    const isMatchOtp = await bcrypt.compare(otp, savedOTP?.otp);

    if (!isMatchOtp) throw new Error("Wrong OTP");

    // check expiry
    if (Date.now() > savedOTP?.expiresAt) throw new Error("OTP Expired");

    // mark isverified true
    savedOTP.isOtpVerified = true;
    await savedOTP.save();

    return res
      .status(200)
      .json({ message: "OTP Verified", success: true});
  } catch (error) {
    next(error);
  }
};

const verifyAuth = (req, res, next) => {
  try {
    
    const token = req.cookies.Token;

    if (!token) {
      throw new Error("No token found in cookies");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      userId: decoded.userId,
      role: decoded.role
    });
  } catch (err) {
   next(err);
  }
};

const LogoutUser=(req,res,next)=>{
  try {
    return res
      .clearCookie("Token", {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production"?true:false, // Set to true in production
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "User Logged Out Successfully ",
        success: true,
      });
  } catch (error) {
    next(error);
  }
}



const forgotPassword = async (req, res,next) => {
try {
    const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found")

  // Generate token
  const token = crypto.randomBytes(32).toString("hex");
  user.forgotPasswordToken = token;
  user.forgotPasswordExpires = Date.now() + 5*60*1000; // 5 min
  await user.save();

  // Send Email
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  console.log(`Reset Link: ${resetUrl}`)
  await sendEmail({
    to: user.email,
    subject: "Password Reset Request",
    html: `You are receiving this email because you (or someone else) have requested the reset of a password. Please click on the following link, or paste this into your browser to complete the process within five minutes: <br><br> <a href="${resetUrl}">${resetUrl}</a>`,
  });

  res.status(200).json({ success:true,message: "Reset link sent to email." });
} catch (error) {

        next(error);
}
};

const resetPassword = async (req, res,next) => {
  try {
    const { token } = req.params;
  const { password } = req.body;



  const user = await User.findOne({
    forgotPasswordToken: token,
  });
  if (!user) throw new Error ("Invalid Token") 

   const expiryTime = user.forgotPasswordExpires.getTime();
    const currentTime = Date.now();

    const isExpired = currentTime > expiryTime;

    // --- Clearer Debugging ---
    // console.log(`Current Time (ms) : ${currentTime}`);
    // console.log(`Expiry Time (ms)  : ${expiryTime}`);
    // console.log(`Is Expired? (current > expiry) : ${isExpired}`);
    // -------------------------
  if(isExpired)
    throw new Error("Token Expired ! Try Again")

  


  
  user.password = await bcrypt.hash(password, 10);
  user.forgotPasswordExpires = undefined;
  user.forgotPasswordToken = undefined;

  await user.save();
  res.status(200).json({ success:true,message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};


const changePassword = async (req, res,next) => {
  try {
    
    const {userId}= req.user;
    if(!userId) throw new Error("User Not Found")

    const { oldpassword, newpassword } = req.body;
    
    const user = await User.findById(userId);
    if (!user) throw new Error ("User Not Found")

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if(!isMatch) throw new Error("Invalid Password! Enter Correct Password")

    user.password = await bcrypt.hash(newpassword, 10);
    await user.save();

 

  
  res.status(200).json({ success:true,message: "Password change successful" });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  registerUser,
  loginUser,
  check,
  sendOTP,
  verifyOTP,
  verifyAuth,
  registerGoogleUser,
  LogoutUser,
  forgotPassword,
  resetPassword,
  changePassword
};
