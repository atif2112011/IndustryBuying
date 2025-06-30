const mongoose = require("mongoose");

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
      type: String,
      enum: ["Tools", "Electricals", "Safety", "Office Supplies"], // Expand if needed
      required: true,
    },
    subCategory: {
      type: String,
      enum: ["Drills", "Wrenches", "Cutters", "Others"], // Expand as per app
      required: true,
    },

    images: [{ type: String }],

    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number },

    stock: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },

    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },

    tags: [{ type: String }],

    technicalAspects: [technicalAspectSchema],
  },
  { timestamps: true }
)

productSchema.pre("save",function(next){
    if(this.isModified("price") || this.isModified("discount")){
        const finalPriceCal = this.price - (this.price*(this.discount/100));
        this.finalPrice=Number(finalPriceCal.toFixed(2));
    }
    next()
})

module.exports = mongoose.model("Product", productSchema);
