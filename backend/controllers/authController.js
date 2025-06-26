const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const otpGenerator = require("otp-generator");
const OTP = require("../models/otpSchema");

//Register a new user
const registerUser = async (req, res, next) => {
  //TODO : check if user already exists, if not create a new user, store password as hashed value, and send a response back to the client.
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone)
      throw new Error(" fill all details ");

    if (!validator.isEmail(email)) throw new Error("Invalid Credentials");

    const existingUser = await User.findOne({ email: email });

    if (existingUser) throw new Error(" User Already Exists. ");

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) throw new Error(" Error in hashing Password ");

    const otpInfo = await OTP.findOne({ phone });

    if (!otpInfo?.isOtpVerified) throw new Error("User Not Verified");

    const savedUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      isVerified: true,
    });

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

    if (!validator.isEmail(email)) throw new Error("Invalid Credentials");

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
      return res
        .status(400)
        .json({ msg: "Error in Token Generation", success: false });

    return res
      .cookie("Token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "User Logged In Successfully ",
        success: true,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};

//Get User Profile
const getUserProfile = async (req, res, next) => {
  //TODO : get the user profile based on the user ID from the request, and send the user profile back to the client.
  // If user does not exist, send an error response.
  try {
    const userId = req.params; // Assuming user ID is stored in req.user after authentication

    if (!userId) throw new Error(" Error in Fetchin ID ");

    const existingUser = await User.findById({ _id: userId });

    if (!existingUser) throw new Error(" User Not Found. ");

    return res.status(200).json({
      message: "User Details ",
      success: true,
      userDetails: existingUser,
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
      throw new Error("Enter a valid 10-digit Indian phone number (no +91)");
    }

    if (!validator.isEmail(email)) throw new Error("Invalid Credentials");

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

    console.log("otp :", otp);
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

    res
      .status(200)
      .json({ message: "OTP send Successfully", success: true, otp: otpInfo });
  } catch (error) {
    next(error);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { otp,phone } = req.body;

    if (!otp || !phone) throw new Error("OTP not send from client ");

    const savedOTP = await OTP.findOne({phone});

    if (!savedOTP) throw new Error("Invalid OTP");

     console.log("savedOTP",savedOTP)

    // compare OTP
    const isMatchOtp =  bcrypt.compare(savedOTP?.otp, otp);

    if (!isMatchOtp) throw new Error("Wrong OTP");

    // check expiry
    if (Date.now() > savedOTP?.expiresAt) throw new Error("OTP Expired");

    // mark isverified true
    savedOTP.isOtpVerified = true;
    await savedOTP.save();

    return res
      .status(200)
      .json({ message: "OTP Verified", success: true, savedOTP });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  check,
  sendOTP,
  verifyOTP,
};
