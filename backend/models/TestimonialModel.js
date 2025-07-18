const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  logo: {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  
},{timestamps:true});

module.exports = mongoose.model("Testimonial", testimonialSchema);
