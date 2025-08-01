const { default: mongoose } = require("mongoose");
const { cloudinary } = require("../config/cloudinary");
const Order = require("../models/orderModel");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
// Create a new order (POST /orders)
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log("data recieved in createOrder", req.body);
    const {
      items,
      shippingInfo,
      billingInfo,
      paymentInfo,
      totalItems,
      totalPrice,
      totalGst,
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
      totalGst,
      currency: currency || "INR",
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
    let {
      page = 1,
      limit = 10,
      search,
      status,
      date, // Expecting 'YYYY-MM-DD'
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    // This object will be used in the $match stage of the pipeline
    const matchQuery = {};

    // Filter by status
    if (status !== undefined) {
      matchQuery.status = status;
    }

    // Filter by date
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      matchQuery.createdAt = { $gte: start, $lte: end };
    }

    // --- Start of New Search Logic ---
    if (search) {
      const searchConditions = [
        // Search by username from the joined 'userDetails'
        { "items.productName": { $regex: search, $options: "i" } },
      ];

      // Also check if the search term is a valid Order ID
      if (mongoose.Types.ObjectId.isValid(search)) {
        searchConditions.push({ _id: new mongoose.Types.ObjectId(search) });
      }

      matchQuery.$or = searchConditions;
    }
    const totalOrders = await Order.countDocuments({ userId, ...matchQuery });

    const orders = await Order.find({ userId, ...matchQuery })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalPages = Math.ceil(totalOrders / limit);
    res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      totalOrders: totalOrders,
      totalPages: totalPages,
      currentPage: page,
      limit: limit,
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
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = req.body.status;

    if (!status) {
      throw new Error("Order status is required");
    }

    const allowedStatuses = [
      "processing",
      "packed",
      "shipped",
      "delivered",
      "cancelled",
      "refunded",
    ];
    if (status && !allowedStatuses.includes(status)) {
      throw new Error("Invalid order status");
    }

    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    console.log(`req.file`, req.file);

    // Check if a new invoice file has been uploaded
    if (req.file) {
      // 1. If an old invoice exists, delete it directly from Cloudinary
      if (order.invoiceUrl) {
        const getPublicId = (url) => {
          // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v12345/products/image_id.jpg
          // We need to extract "products/image_id"
          const parts = url.split("/");
          const publicIdWithExtension = parts
            .slice(parts.indexOf("products"))
            .join("/");
          return publicIdWithExtension.split(".")[0];
        };
        await cloudinary.uploader.destroy(getPublicId(order.invoiceUrl));
      }

      // 2. Upload the new file directly to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "invoices",
              public_id: req.file.originalname.split(".")[0],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      // 3. Update the order's invoice details
      order.invoiceUrl = result.secure_url;
    }

    if (status) {
      order.status = status;
    }

    if (status === "delivered") {
      order.deliveredAt = new Date();
    } else {
      order.deliveredAt = null;
    }

    await order.save();

    res.status(200).json({
      message: "Order updated successfully",
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
      throw new Error("No file uploaded");
    }

    // if (file.mimetype !== 'application/pdf') {
    //   throw new Error('Only PDF files are allowed');
    // }

    // Upload file buffer to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "invoices",
        public_id: `invoice-${id}-${Date.now()}`,
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
    const stream = require("stream");
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(result);
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 10,
      search,
      status,
      date, // Expecting 'YYYY-MM-DD'
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    // This object will be used in the $match stage of the pipeline
    const matchQuery = {};

    // Filter by status
    if (status !== undefined) {
      matchQuery.status = status;
    }

    // Filter by date
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      matchQuery.createdAt = { $gte: start, $lte: end };
    }

    // --- Start of New Search Logic ---
    if (search) {
      const searchConditions = [
        // Search by username from the joined 'userDetails'
        { "userDetails.name": { $regex: search, $options: "i" } },
      ];

      // Also check if the search term is a valid Order ID
      if (mongoose.Types.ObjectId.isValid(search)) {
        searchConditions.push({ _id: new mongoose.Types.ObjectId(search) });
      }

      matchQuery.$or = searchConditions;
    }
    // --- End of New Search Logic ---

    // The base pipeline for joining and filtering
    const basePipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      { $match: matchQuery },
    ];

    // We need a separate pipeline to count total matching documents
    const countPipeline = [...basePipeline, { $count: "total" }];
    const totalResult = await Order.aggregate(countPipeline);
    const totalOrders = totalResult.length > 0 ? totalResult[0].total : 0;
    const totalPages = Math.ceil(totalOrders / limit);

    if (page > totalPages && totalOrders > 0) {
      throw new Error(`Page ${page} exceeds total pages (${totalPages})`);
    }

    // Main pipeline to fetch the paginated data
    const dataPipeline = [
      ...basePipeline,
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        // Manually shape the output to include user name and id
        $project: {
          // Include all original order fields
          items: 1,
          billingInfo: 1,
          totalItems: 1,
          totalPrice: 1,
          currency: 1,
          status: 1,
          paymentInfo: 1,
          shippingInfo: 1,
          orderedItems: 1,
          totalAmount: 1,
          createdAt: 1,
          updatedAt: 1,
          deliveredAt: 1,
          invoiceUrl: 1,
          _id: 1,
          // Add user details explicitly
          userId: "$userDetails._id",
          userName: "$userDetails.name",
        },
      },
    ];

    const orders = await Order.aggregate(dataPipeline);

    res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      totalPages,
      totalOrders,
      currentPage: page,
      limit,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

const getUserInvoices = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    let { page, limit, search, status, date } = req.query;

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    const skip = (page - 1) * limit;
const matchQuery = {};

if (date) {
  const start = new Date(date);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  // Match either updatedAt or deliveredAt within range
  matchQuery.$or = [
    { updatedAt: { $gte: start, $lte: end } },
    { deliveredAt: { $gte: start, $lte: end } }
  ];
}

if (search) {
  // Validate if it's a valid ObjectId
  if (mongoose.Types.ObjectId.isValid(search)) {
    matchQuery._id = new mongoose.Types.ObjectId(search);
  }
}

if (!userId) {
  throw new Error("User not found");
}

const orders = await Order.find({ userId, ...matchQuery }).limit(limit).skip(skip).sort({ createdAt: -1 });
const invoices = orders.filter((order) => order.invoiceUrl);

    const totalInvoices = invoices.length;
    const totalInvoicePages = Math.ceil(totalInvoices / limit);

    if (page > totalInvoicePages && totalInvoices > 0) {
      throw new Error(`Page ${page} exceeds total pages (${totalInvoicePages})`);
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      invoices,
      totalInvoices,
      totalInvoicePages,
      currentPage: page,
      limit,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  uploadInvoiceDirect,
  getAllOrders,
  getUserInvoices,
};
