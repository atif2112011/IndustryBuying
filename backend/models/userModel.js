const mongoose = require('mongoose');


// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  phone: {
    type: String,
    default: '',
    unique:true
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    enum: ['customer', 'admin', 'seller'],
    default: 'customer',
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  pfp: {
    type: String,
    default: '', // store URL of profile picture
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Must create a separate Company model
    default: '',
  },

 
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
