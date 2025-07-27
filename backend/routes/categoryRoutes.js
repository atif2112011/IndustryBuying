const express = require('express');
const { getAllCategoriesWithSubcategories, getProductsByCategory, getProductsBySubcategory, getSubcategories, getCategoryProductCount, getCategoryAdmin } = require('../controllers/categoryController');
const router = express.Router();





router.get('/menu',getAllCategoriesWithSubcategories);
router.post('/get-subcategories',getSubcategories);
router.post('/fetch-category',getProductsByCategory);
router.post('/fetch-subcategory',getProductsBySubcategory);

router.get("/category-productCount",getCategoryProductCount)
router.get("/category-productsubCount",getCategoryAdmin)
module.exports = router;