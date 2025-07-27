const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/Auth');
const {getUserProfile,updateUserProfile,addUserAddress,updateUserAddress,deleteUser,blockUser,unBlockUser, getAllUser} = require('../controllers/userController');


router.get("/all",getAllUser)
router.get('/:id',authMiddleware,getUserProfile);
router.put("/:id",updateUserProfile);

// add address  
router.post("/address/:id",addUserAddress)
// update Address
router.put("/address/:id",updateUserAddress);

// delete user
router.delete("/:id",deleteUser)

// to block user
router.put("/:id/block", blockUser);
router.put("/:id/unblock", unBlockUser);


module.exports = router;