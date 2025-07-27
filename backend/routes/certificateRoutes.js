const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createCertification,
  getCertifications,
  updateCertification,
  deleteCertification,
} = require("../controllers/certificateController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// All routes prefixed with /api/certifications
router.post("/addCertificate", upload.single("img"), createCertification);
router.get("/getCertificate", getCertifications);
router.put("/update/:id", upload.single("img"), updateCertification);
router.delete("/delete/:id", deleteCertification);

module.exports = router;
