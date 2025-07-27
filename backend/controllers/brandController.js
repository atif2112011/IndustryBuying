// controllers/BrandController.js
const Brand = require("../models/brandModel");
const stream = require("stream");
const cloudinary = require("../config/cloudinary")

const addBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!file) throw new Error("No logo file provided");

    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    const uploadStream = await cloudinary.uploader.upload_stream(
      {
        folder: "Brands",
        resource_type: "image",
      },
      async (error, result) => {
        if (error) return next(error);

        const brand = await   Brand.create({
          name,
          img: {
            public_id: result.public_id,
            secure_url: result.secure_url,
          },
        });

        res.status(201).json({ success: true, message: "Brand added", brand });
      }
    );

    bufferStream.pipe(uploadStream);
  } catch (error) {
    next(error);
  }
};

const getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    if(!brands)
        throw new Error("brands not found")

    res.status(200).json({ success: true, brands });
  } catch (error) {
    next(error);
  }
};


const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const file = req.file;

    const brand = await Brand.findById(id);
    if (!brand) throw new Error("Brand not found");

    brand.name = name || brand.name;
    

    if (!file) {
      await brand.save();
      return res
        .status(200)
        .json({ success: true, message: "Brand updated", brand });
    }

    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "Brands",
        resource_type:"image"
      },
      async (error, result) => {
        if (error) return next(error);

        if (brand.img?.public_id) {
          await cloudinary.uploader.destroy(brand.img.public_id);
        }

        brand.img = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };

        await brand.save();
        res
          .status(200)
          .json({
            success: true,
            message: "Brand updated with new logo",
            brand,
          });
      }
    );

    bufferStream.pipe(uploadStream);
  } catch (error) {
    next(error);
  }
};


const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) throw new Error("Brand not found");

    if (brand.img?.public_id) {
      await cloudinary.uploader.destroy(brand.img.public_id);
    }

    await Brand.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Brand deleted" });
  } catch (error) {
    next(error);
  }
};


module.exports={addBrand,getBrands,deleteBrand,updateBrand}