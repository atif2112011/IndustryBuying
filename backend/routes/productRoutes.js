const express = require("express")
const {getProducts, getShowcaseProducts,getRecommended,getBestSellers, searchProducts, productDetails, addProduct, updateProductAdmin, deleteProductAdmin}=require("../controllers/productsController")
const authMiddleware = require("../middlewares/Auth")
const router = express.Router()

router.get("/",getProducts)
router.get("/showcase", getShowcaseProducts);
router.get("/recommended",authMiddleware ,getRecommended);
router.get("/bestsellers",getBestSellers);
router.get("/search",searchProducts)
router.get("/:slug", productDetails);

router.post("/addProduct",authMiddleware,addProduct)
router.put("/update/:id", authMiddleware, updateProductAdmin);
router.delete("/delete/:id",authMiddleware,deleteProductAdmin)


module.exports=router