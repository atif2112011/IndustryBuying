const { cloudinary } = require('../config/cloudinary');
const Order = require('../models/orderModel');
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() });
// Create a new order (POST /orders)
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const {
      items,
      shippingInfo,
      billingInfo,
      paymentInfo,
      totalItems,
      totalPrice,
      currency,
    } = req.body;

    if (!items || items.length === 0) {
      throw new Error("Cart is empty");
    }

    const newOrder = new Order({
      userId,
      items,
      shippingInfo,
      billingInfo,
      paymentInfo,
      totalItems,
      totalPrice,
      currency: currency || 'INR',
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// Get all orders of a user (GET /orders)
const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single order by ID (GET /orders/:id)
const getOrderById = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const order = await Order.findOne({ _id: id, userId });

    if (!order) {
      throw new Error("Order not found");
    }

    res.status(200).json({
      message: "Order fetched successfully",
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// Update order status (PUT /orders/:id/status)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['processing','packed', 'shipped', 'delivered', 'cancelled', 'refunded'];
    if (!allowedStatuses.includes(status)) {
      throw new Error("Invalid order status");
    }

    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }

    order.status = status;

    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// Delete an order (DELETE /orders/:id)
const deleteOrder = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const order = await Order.findOneAndDelete({ _id: id, userId });

    if (!order) {
      throw new Error("Order not found or unauthorized");
    }

    res.status(200).json({
      message: "Order deleted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};


const uploadInvoiceDirect = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      throw new Error('No file uploaded');
    }

    // if (file.mimetype !== 'application/pdf') {
    //   throw new Error('Only PDF files are allowed');
    // }

    // Upload file buffer to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'invoices',
        public_id: `invoice-${id}-${Date.now()}`
      },
      async (error, result) => {
        if (error) {
          return next(error);
        }

        const order = await Order.findById(id);
        if (!order) throw new Error("Order not found");

        order.invoiceUrl = result.secure_url;
        await order.save();

        res.status(200).json({
          message: "Invoice uploaded successfully",
          success: true,
          invoiceUrl: result.secure_url,
        });
      }
    );

    // Pipe the file buffer into the Cloudinary stream
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  uploadInvoiceDirect
};
