const User = require("../models/userModel");

//Get User Profile
const getUserProfile = async (req, res, next) => {
  //TODO : get the user profile based on the user ID from the request, and send the user profile back to the client.
  // If user does not exist, send an error response.
  try {
    const {id} = req.params; // Assuming user ID is stored in req.user after authentication

    if (!id) throw new Error(" Error in Fetchin ID ");

    const existingUser = await User.findById({ _id: id });

    if (!existingUser) throw new Error(" User Not Found. ");

    return res.status(200).json({
      message: "User Details ",
      success: true,
      userDetails: {...existingUser._doc,password:null,createdAt:null,updatedAt:null,__v:null},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = 
  getUserProfile