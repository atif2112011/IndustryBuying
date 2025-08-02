const { default: mongoose } = require("mongoose");

const technicalAspectSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    shortDescription: { type: String },

    brand: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },

    images: [{ type: String }],

    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    gst: { type: Number, default: 0 },
    finalPrice: { type: Number },
    prepaid: { type: Boolean, default: false },
    cod: { type: Boolean, default: false },
    partCod: { type: Boolean, default: false },
    returnTime: { type: Number, default: 7 },
    return: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },

    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },

    tags: [{ type: String }],

    technicalAspects: [technicalAspectSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Product", productSchema);
