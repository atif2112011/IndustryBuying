const Certification = require("../models/CertificateModel");
const cloudinary = require("../config/cloudinary");
const stream = require("stream");

// CREATE
const createCertification = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) throw new Error("All fields are required");

    const file = req.file;

    if (!file) throw new Error("Certificate image is required");

    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "certifications" },
      async (error, result) => {
        if (error) return next(error);

        const newCert = await Certification.create({
          title,
          description,
          img: {
            public_id: result.public_id,
            secure_url: result.secure_url,
          },
        });

        res.status(201).json({ success: true, certification: newCert });
      }
    );

    bufferStream.pipe(uploadStream);
  } catch (error) {
    next(error);
  }
};

// READ ALL
const getCertifications = async (req, res, next) => {
  try {
    const certs = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, certifications: certs });
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const file = req.file;

    const cert = await Certification.findById(id);
    if (!cert) throw new Error("Certification not found");

    cert.title = title || cert.title;
    cert.description = description || cert.description;

    if (!file) {
      await cert.save();
      return res.status(200).json({
        success: true,
        message: "Updated without image",
        certification: cert,
      });
    }

    // Upload new image and delete old one
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "certifications" },
      async (error, result) => {
        if (error) return next(error);

        if (cert.img?.public_id) {
          await cloudinary.uploader.destroy(cert.img.public_id);
        }

        cert.img = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };

        await cert.save();
        res.status(200).json({
          success: true,
          message: "Updated successfully",
          certification: cert,
        });
      }
    );

    bufferStream.pipe(uploadStream);
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cert = await Certification.findById(id);
    if (!cert) throw new Error("Certification not found");

    if (cert.img?.public_id) {
      await cloudinary.uploader.destroy(cert.img.public_id);
    }

    await Certification.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Certification deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports={createCertification,getCertifications,updateCertification,deleteCertification}