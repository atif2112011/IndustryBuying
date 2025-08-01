const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
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
      default: "",
      unique: true,
    },

    isGoogleLogin: {
      type: Boolean,
      default: false,
    },

    googleId: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: false,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["customer", "admin", "seller"],
      default: "customer",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    pfp: {
      type: String,
      default: "", // store URL of profile picture
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Must create a separate Company model
    },
    gstin: {
      type: String,
      required:false,
      unique:false,
      
    },
    address: [
      {
        name: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 70,
        },
        email: {
          type: String,
          required: true,
          match: [/.+\@.+\..+/, "Please enter a valid email address"],
        },
        type: {
          type: String,
          enum: ["home", "office", "other"],
          required: true,
        },
        isShipping: {
          type: Boolean,
          default: false,
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
        },
        alternatePhone: {
          type: String,
        },
        flat: {
          type: String,
          required: true,
          maxlength: [150, "Flat info must be under 100 characters"],
        },
        area: {
          type: String,
          required: true,
          maxlength: [150, "Area must be under 100 characters"],
        },
        landmark: {
          type: String,
          maxlength: [150, "Landmark must be under 100 characters"],
        },
        state: {
          type: String,
          required: [true, "State is required"],
        },
        city: {
          type: String,
          required: [true, "City is required"],
        },
        pincode: {
          type: String,
          required: [true, "Pincode is required"],
        },
        gstin: {
          type: String,
          required:false,
          unique:false,
          
          
        },
      },
    ],
    isBlock:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
