const multer = require("multer");

// Memory storage to directly send buffer to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
