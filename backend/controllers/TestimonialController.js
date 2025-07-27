const Testimonial = require("../models/TestimonialModel")
const cloudinary = require("../config/cloudinary")
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const stream = require("stream");

const addTestimonial = async (req, res, next) => {
  try {
    const { name, designation, company, message } = req.body;

    if (!name || !designation || !company || !message)
      throw new Error("Fill all the required fields");

    const checkDuplicate = await Testimonial.findOne({ name });
    if (checkDuplicate)
      throw new Error(`Testimonial already exists for ${checkDuplicate.name}`);

    let logo = null;

    // Only proceed with cloudinary upload if a file is sent
    if (req.file) {
      const streamUpload = (file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "testimonials",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(new Error("Cloudinary upload failed"));
              resolve(result);
            }
          );

          stream.end(file.buffer); // Push the file buffer into the stream
        });
      };

      const result = await streamUpload(req.file);
      logo = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    const testimonial = await Testimonial.create({
      name,
      designation,
      company,
      message,
      ...(logo && { logo }),
    });

    return res.status(201).json({
      message: "Testimonial created successfully",
      testimonial,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};



const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, designation, company, message } = req.body;
    const file = req.file;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) throw new Error("Testimonial not found");

    testimonial.name = name || testimonial.name;
    testimonial.designation = designation || testimonial.designation;
    testimonial.company = company || testimonial.company;
    testimonial.message = message || testimonial.message;

    if (!file) {
      // No logo update
      await testimonial.save();
      return res.status(200).json({
        success: true,
        message: "Testimonial updated without logo change",
        testimonial,
      });
    }

    // If logo file is present, delete old and upload new
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "testimonials",
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary update error:", error);
          return next(error);
        }

        // Delete old logo from Cloudinary
        if (testimonial.logo?.public_id) {
          await cloudinary.uploader.destroy(testimonial.logo.public_id);
        }

        testimonial.logo = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };

        await testimonial.save();

        res.status(200).json({
          success: true,
          message: "Testimonial updated successfully",
          testimonial,
        });
      }
    );

    bufferStream.pipe(uploadStream);
  } catch (error) {
    next(error);
  }
};

const getTestimonials = async (req, res,next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({testimonials:testimonials,success:true});
  } catch (error) {
   next(error)
  }
};

const deleteTestimonial = async (req, res,next) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) 
        throw new Error(" Testimonial Not found");

    // Delete image from Cloudinary
    if (testimonial?.logo?.public_id) {
      await cloudinary.uploader.destroy(testimonial.logo.public_id);
    }

    await testimonial.deleteOne();

    res.status(200).json({ message: "Testimonial deleted", success:true });
  } catch (error) {
     next(error)
  }
};





module.exports = {addTestimonial,getTestimonials,updateTestimonial,deleteTestimonial}