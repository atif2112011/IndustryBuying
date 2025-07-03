const express = require('express');
const { getAllCategoriesWithSubcategories, getProductsByCategory, getProductsBySubcategory } = require('../controllers/categoryController');
const router = express.Router();





router.get('/menu',getAllCategoriesWithSubcategories);
router.post('/fetch-category',getProductsByCategory);
router.post('/fetch-subcategory',getProductsBySubcategory);


module.exports = router;