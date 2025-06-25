const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/Auth');
const getUserProfile = require('../controllers/userController');



router.get('/profile/:id',authMiddleware,getUserProfile);

module.exports = router;