const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const otpGenerator = require("otp-generator");
const OTP = require("../models/otpSchema");
// const { Error } = require("mongoose");

//Register a new user
const registerUser = async (req, res, next) => {
  //TODO : check if user already exists, if not create a new user, store password as hashed value, and send a response back to the client.
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone)
      throw new Error(
        " Check if all fields are present:Name, Email, Password and Phone "
      );

    if (!validator.isEmail(email)) throw new Error("Invalid Email");

    const existingUser = await User.findOne({ email: email });

    if (existingUser) throw new Error(" User Already Exists. ");

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) throw new Error(" Error in hashing Password ");

    const otpInfo = await OTP.findOne({ phone });

    if (!otpInfo?.isOtpVerified) throw new Error("OTP verification Not Found");

    const savedUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      isVerified: true,
    });
    await OTP.deleteMany({ phone }); // optional if not tracking verified OTPs

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

    if (!email || !password) throw new Error(" fill all details ");

    if (!validator.isEmail(email)) throw new Error("Invalid Email Format");

    const isExist = await User.findOne({ email });

    //TODO : check if user exists, if yes, compare password with hashed password, and send a response back to the client.
    if (!isExist) throw new Error("User Not Signed Up ");

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
    const { email, phone } = req.body;

    if (!email || !phone) throw new Error("Enter Phone and Email ");

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error(
        "Enter a valid 10-digit Indian phone number (excluding +91)"
      );
    }

    if (!validator.isEmail(email)) throw new Error("Invalid Email");

    const user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user) throw new Error("User Already Exist with this Email OR Phone");

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
    const { phone } = req.body;
    if (!phone) throw new Error("Please Enter Phone Number");

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("Enter a valid 10-digit Indian phone number (no +91)");
    }

    // OTP generate
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log(`otp generated for number ${phone} : `, otp);
    const hashedOtp = await bcrypt.hash(otp, 10);

    // saved OTP in DB
    const newExpiry = Date.now() + 5 * 60 * 1000;

    const otpInfo = await OTP.create({
      phone,
      otp: hashedOtp,
      expiresAt: newExpiry,
    });

    // send otp to phone
    // try {
    // } catch (error) {
    //   throw error;
    // }

    res.status(200).json({ message: "OTP send Successfully", success: true });
  } catch (error) {
    next(error);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { otp, phone } = req.body;

    if (!otp || !phone) throw new Error("OTP or Phone is missing");

    const savedOTP = await OTP.findOne({ phone, isOtpVerified: false }).sort({
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

module.exports = {
  registerUser,
  loginUser,
  check,
  sendOTP,
  verifyOTP,
  verifyAuth
};
