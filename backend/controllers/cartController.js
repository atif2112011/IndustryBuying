const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); // Assuming product details are fetched for validation

// GET /cart
const getCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });

    res.status(200).json({
      message: "Cart fetched successfully",
      success: true,
      cart: cart || { items: [], totalItems: 0, totalPrice: 0 ,totalGst:0},
    });
  } catch (error) {
    next(error);
  }
};

// POST /cart/add
const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = product.price-(product.price * product.discount) / 100;
      existingItem.gstPercentage=product.gst;
      existingItem.gst=existingItem.price*existingItem.quantity*product.gst/100;
      existingItem.subtotal = existingItem.quantity * existingItem.price + existingItem.gst;
    } else {
      cart.items.push({
        productId,
        productName: product.name,
        price: product.price-(product.price * product.discount) / 100,
        quantity,
        gstPercentage:product.gst,
        gst:(product.price-(product.price * product.discount) / 100)*quantity*product.gst/100,
        subtotal: (product.price-(product.price * product.discount) / 100)*(quantity) + ((product.price-(product.price * product.discount) / 100)*quantity*product.gst/100),
        image: product.images[0] || '',
      });
    }

    cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
    cart.totalGst=cart.items.reduce((acc, item) => acc + item.gst, 0);
    await cart.save();

    res.status(200).json({
      message: "Product added to cart successfully",
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /cart/item/:productId
const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const { quantity } = req.body;

   

    const cart = await Cart.findOne({ userId });
    if (!cart) {
     throw new Error("Cart not found");
    }
    

    const item = cart.items.find(item => item.productId.toString() == productId);
    if (!item) {
      throw new Error("Product not in cart");
    }

    item.quantity = quantity;
    item.gst=item.price*quantity*item.gstPercentage/100;
    item.subtotal = quantity * item.price+(item.price*quantity*item.gstPercentage/100);

    cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
    cart.totalGst=cart.items.reduce((acc, item) => acc + item.gst, 0);
    await cart.save();

    res.status(200).json({
      message: "Cart item updated successfully",
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /cart/item/:productId
const removeCartItem = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
     throw new Error("Cart not found" );
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
    cart.totalGst=cart.items.reduce((acc, item) => acc + item.gst, 0);
    await cart.save();

    res.status(200).json({
      message: "Cart item removed successfully",
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /cart/clear
const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0; 
    cart.totalGst=0
    await cart.save();

    res.status(200).json({
      message: "Cart cleared successfully",
      success: true,
      cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
