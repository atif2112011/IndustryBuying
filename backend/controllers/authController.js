const User = require('../models/userModel');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Register a new user
const registerUser =async (req, res) => {
    //TODO : check if user already exists, if not create a new user, store password as hashed value, and send a response back to the client.
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password)
            throw new Error(" fill all details ")

        const existingUser = await User.findOne({email:email})
        
        if(existingUser)
          throw new Error(" User Already Exists. ");

        const hashedPassword = await bcrypt.hash(password,10)

        if(!hashedPassword)
          throw new Error(" Error in hashing Password ");
        
        const savedUser = await User.create({name,email,password:hashedPassword})

        return res.status(200).json({message:"User Registered Successfully.",success:true,user:savedUser})      

        
    } catch (error) {
       next(error)
    }
}


//Login an existing user
const loginUser = async (req, res) => {

    
    //If user does not exist, send an error response.
    // If password is correct, generate a JWT token and send it back to the client.
    // If password is incorrect, send an error response.
    try {
      const { email, password } = req.body;

      if (!email || !password)
        throw new Error(" fill all details ");


      const isExist = await User.findOne({ email });

    //TODO : check if user exists, if yes, compare password with hashed password, and send a response back to the client.
      if (!isExist)
        throw new Error("User Not Signed Up ");

      // Password compare
      const isPassword = await bcrypt.compare(password,isExist.password) 
      
      if(!isPassword)
        throw new Error("Invalid Credentials ");
      
      // generate token
       const token = jwt.sign({userId: isExist?._id,role:isExist?.role},process.env.JWT_SECRET,{expiresIn:'1d'})
       
       if(!token)
        return res
          .status(400)
          .json({ msg: "Error in Token Generation", success: false });
       
     return res
       .cookie("Token", token, {
         httpOnly: true,
         secure: true,
         sameSite: "strict",
         maxAge:24 *60*60*1000
       })
       .status(200)
       .json({ message: "User Logged In Successfully ", success: true,token:token });   

    } catch (error) {
       next(error)

    }

 
}

//Get User Profile
const getUserProfile = async (req, res) => {
//TODO : get the user profile based on the user ID from the request, and send the user profile back to the client.
// If user does not exist, send an error response.
    try {
        const userId = req.params; // Assuming user ID is stored in req.user after authentication
        
        if(!userId)
          throw new Error(" Error in Fetchin ID ");

        const existingUser = await User.findById({_id:userId})

        if (!existingUser)
          throw new Error(" User Not Found. ");
        
         return res.status(200).json({message:"User Details ",success:true,userDetails:existingUser})    


        
    } catch (error) {
        next(error)

 
}

module.exports = { registerUser, loginUser ,getUserProfile }
