const User = require("../models/userModel");
const mongoose = require("mongoose");

//Get User Profile
const getUserProfile = async (req, res, next) => {
  //TODO : get the user profile based on the user ID from the request, and send the user profile back to the client.
  // If user does not exist, send an error response.
  try {
    const { id } = req.params; // Assuming user ID is stored in req.user after authentication

    if (!id) throw new Error(" Error in Fetchin ID ");

    const existingUser = await User.findById({ _id: id });

    if (!existingUser) throw new Error(" User Not Found. ");

    return res.status(200).json({
      message: "User Details ",
      success: true,
      userDetails: {
        _id: existingUser._id,
        role: existingUser.role,
        isVerified: existingUser.isVerified,
        pfp: existingUser.pfp,
        isBlock: existingUser.isBlock,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,
        gstin: existingUser.gstin,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    // console.log(updatedUser);

    // DB call to get User
    const existingUser = await User.findByIdAndUpdate(
      id,
      { ...updatedUser },
      { new: true }
    );

    if (!existingUser) throw new Error("User Not Found");

    //send updated user
    res.status(200).json({
      message: "User Updated Successfully",
      success: true,
      updatedUser: existingUser,
    });
  } catch (error) {
    next(error);
  }
};

// Add new address to user's address list
const addUserAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      alternatePhone,
      flat,
      area,
      landmark,
      state,
      city,
      pincode,
      type,
      isShipping,
      GSTIN,
    } = req.body;

    const user = await User.findById(id);
    if (!user) throw new Error("User not found");

    const newAddress = {
      _id: new mongoose.Types.ObjectId(), // generate a unique id for the address
      name,
      email,
      phone,
      alternatePhone,
      flat,
      area,
      landmark,
      state,
      city,
      pincode,
      type,
      isShipping,
      GSTIN,
    };

    user.address.push(newAddress);
    await user.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Address added successfully",
        address: newAddress,
      });
  } catch (error) {
    next(error);
  }
};

const updateUserAddress = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { updatedData } = req.body;

    if (!updatedData || !updatedData._id)
      throw new Error("updatedData with a valid _id is required");

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const addressToUpdate = user.address.id(updatedData._id); // Mongoose helper

    if (!addressToUpdate) throw new Error("Address not found with given ID");

    // Update address fields
    Object.keys(updatedData).forEach((key) => {
      if (key !== "_id") {
        addressToUpdate[key] = updatedData[key];
      }
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address: addressToUpdate,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) throw new Error("User not Found ");

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const blockUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { isBlock: true },
      { new: true }
    );

    if (!user) throw new Error("user not found");

    return res
      .status(200)
      .json({
        success: true,
        message: "User Blocked",
        user: user,
        success: true,
      });
  } catch (error) {
    next(error);
  }
};

const unBlockUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { isBlock: false },
      { new: true }
    );

    if (!user) throw new Error("updated user not found");

    return res
      .status(200)
      .json({ message: "User UnBlocked", user: user, success: true });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || null;
    const role = req.query.role || null;
    const isBlock=req.query.status || null;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
          ],
        }
      : {};

      if(role){
        query.role=role
      }
      if(isBlock){
        query.isBlock=isBlock
      }


    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalUser = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUser / limit);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      totalPages,
      totalUser,
      currentPage: page,
      limit,
      users,
    })

  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserProfile,
  getUserProfile,
  updateUserAddress,
  addUserAddress,
  deleteUser,
  blockUser,
  unBlockUser,
  getAllUser
};
