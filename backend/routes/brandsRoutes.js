const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

router.post("/addBrand", upload.single("img"), addBrand);
router.get("/getBrands", getBrands);
router.put("/updateBrand/:id", upload.single("img"), updateBrand);
router.delete("/deleteBrand/:id", deleteBrand);

module.exports = router;
