const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/Auth');
const { getCart, addToCart, updateCartItem, removeCartItem, clearCart } = require('../controllers/cartController');




router.get('/',authMiddleware,getCart);

router.post("/add",authMiddleware,addToCart);


router.put("/item/:productId",authMiddleware,updateCartItem)

router.delete("/item/:productId",authMiddleware,removeCartItem)

router.delete("/clear",authMiddleware,clearCart)
module.exports = router;