const express = require("express")
const {getProducts, getShowcaseProducts,getRecommended,getBestSellers, searchProducts, productDetails, addProduct, updateProductAdmin, deleteProductAdmin}=require("../controllers/productsController")
const authMiddleware = require("../middlewares/Auth")
const upload = require("../middlewares/upload")
const router = express.Router()

router.get("/",getProducts)
router.get("/showcase", getShowcaseProducts);
router.get("/recommended",getRecommended);
router.get("/bestsellers",getBestSellers);
router.get("/search",searchProducts)
router.get("/:id", productDetails);

router.post("/addProduct",upload.array("images", 3),addProduct)
router.put("/update/:id", upload.array("images", 3), updateProductAdmin);
router.delete("/delete/:id",deleteProductAdmin)


module.exports=router