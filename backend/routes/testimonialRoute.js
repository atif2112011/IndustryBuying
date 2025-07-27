const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const express = require("express")
const {addTestimonial, getTestimonials, updateTestimonial, deleteTestimonial} = require('../controllers/TestimonialController')
const router = express.Router()

router.post("/addTestimonial", upload.single("logo"),addTestimonial)
router.get("/getTestimonials",getTestimonials)
router.put("/updateTestimonial/:id",upload.single("logo"),updateTestimonial)
router.delete("/deleteTestimonial/:id",deleteTestimonial)



module.exports = router