const User = require('../models/userModel');

//Register a new user
const registerUser =async (req, res) => {
    //TODO : check if user already exists, if not create a new user, store password as hashed value, and send a response back to the client.
    try {
        const { name, email, password } = req.body;
        
    } catch (error) {
       next(error); 
    }
}


//Login an existing user
const loginUser = async (req, res) => {

    //TODO : check if user exists, if yes, compare password with hashed password, and send a response back to the client.
    //If user does not exist, send an error response.
    // If password is correct, generate a JWT token and send it back to the client.
    // If password is incorrect, send an error response.
    try {
        const { email, password } = req.body;
        
    } catch (error) {
       next(error); 
    }

 
}

//Get User Profile
const getUserProfile = async (req, res) => {
//TODO : get the user profile based on the user ID from the request, and send the user profile back to the client.
// If user does not exist, send an error response.
    try {
        const userId = req.params; // Assuming user ID is stored in req.user after authentication
        
        
    } catch (error) {
       next(error); 
    }

 
}

//Verify Auth Token
const verifyAuthToken = async (req, res) => {

    //TODO : verify the JWT token, if valid, send a success response, if not valid, send an error response.
    // You can use a library like jsonwebtoken to verify the token.
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token format
        
        
    } catch (error) {
       next(error); 
    }

 
}

module.exports = { registerUser, loginUser ,getUserProfile, verifyAuthToken };
