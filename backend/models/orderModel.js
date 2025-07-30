const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  gstPercentage: {
    type: Number,
    required:false
  },
  gst: {
    type: Number,
    required: false,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
});

const shippingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'home' }, // home, work, etc.
  isShipping: { type: Boolean, default: true },
  phone: { type: String, required: true },
  alternatePhone: { type: String },
  flat: { type: String, required: true },
  area: { type: String, required: true },
  landmark: { type: String },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
});

const billingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'home' }, // home, work, etc.
  isShipping: { type: Boolean, default: false },
  phone: { type: String, required: true },
  alternatePhone: { type: String },
  flat: { type: String, required: true },
  area: { type: String, required: true },
  landmark: { type: String },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
});

const paymentSchema = new mongoose.Schema({
  method: { type: String, required: true }, // e.g., 'Razorpay', 'COD'
  status: { type: String, default: 'pending' }, // pending, paid, failed
  paymentId: { type: String }, // Razorpay Payment ID or UPI Txn ID
  paidAt: { type: Date },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    shippingInfo: shippingSchema,
    billingInfo: billingSchema,
    paymentInfo: paymentSchema,
    totalItems: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalGst: {
      type: Number,
      required: false,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['processing','packed', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'processing',
    },
    deliveredAt: {
      type: Date,
    },
    invoiceUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
