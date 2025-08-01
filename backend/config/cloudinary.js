const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const config = cloudinary.config(); // proper usage
console.log(`Cloudinary Configured: ${config.cloud_name}`);

module.exports = { cloudinary }; // export cloudinary;
