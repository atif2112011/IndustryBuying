const User = require('../models/userModel');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
//Register a new user
const registerUser =async (req, res) => {
    //TODO : check if user already exists, if not create a new user, store password as hashed value, and send a response back to the client.
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password)
            return res.status(400).json({msg:"Fill All Details",success:false})

        const existingUser = await User.findOne({email:email})
        
        if(existingUser)
            return res
              .status(400)
              .json({ msg: "User Already Signed Up.", success: false });
        
        const hashedPassword = await bcrypt.hash(password,10)

        if(!hashedPassword)
            return res.status(400).json({msg:"Error in hashing password",success:false})
        
        const savedUser = await User.create({name,email,password:hashedPassword})

        return res.status(200).json({msg:"User Registered Successfully.",success:true,user:savedUser})      

        
    } catch (error) {
       return res.status(400).json({error:error.message})
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
        return res
          .status(400)
          .json({ msg: "Fill All Details", success: false });

      const isExist = await User.findOne({ email });

    //TODO : check if user exists, if yes, compare password with hashed password, and send a response back to the client.
      if (!isExist)
        return res
          .status(400)
          .json({ msg: "User Not Signed Up.", success: false });

      // Password compare
      const isPassword = await bcrypt.compare(password,isExist.password) 
      
      if(!isPassword)
        return res
          .status(400)
          .json({ msg: "Invalid Credentials. ", success: false });
      
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
       .json({ msg: "User Logged In Successfully ", success: true,token:token });   

    } catch (error) {
        return res
          .status(400)
          .json({ error:error.message });

    }

 
}

//Get User Profile
const getUserProfile = async (req, res) => {
//TODO : get the user profile based on the user ID from the request, and send the user profile back to the client.
// If user does not exist, send an error response.
    try {
        const userId = req.params; // Assuming user ID is stored in req.user after authentication
        
        if(!userId)
            return res.status(400).json({msg:"Error in fetching ID ",success:false})

        const existingUser = await User.findById({_id:userId})

        if (!existingUser)
          return res
            .status(400)
            .json({ msg: " User Not Found ", success: false });
        
         return res.status(200).json({msg:"User Details ",success:true,userDetails:existingUser})    


        
    } catch (error) {
        return res.status(400).json({ error: error.message }); 
    }

 
}

//Verify Auth Token
const verifyAuthToken = async (req, res,next) => {

    //TODO : verify the JWT token, if valid, send a success response, if not valid, send an error response.
    // You can use a library like jsonwebtoken to verify the token.
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token format
        
        if(!token)
         return res
        .status(400)
        .json({msg:"Token not Found",success:false});

        // verify 
        const data = jwt.verify(token,process.env.JWT_SECRET)

        if(!data)
            return res.status(400).json({ msg:"User Not Logged In ",success:false });

        req.user = data

         res.json({msg:"Token Verified Successfully",success:true}).status(200);

        next()
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

 
}

module.exports = { registerUser, loginUser ,getUserProfile, verifyAuthToken };
