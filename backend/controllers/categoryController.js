const Category = require( '../models/categoryModel.js');
const Subcategory= require ('../models/subcategoryModel.js');
const Product =require('../models/productModel.js')

const getAllCategoriesWithSubcategories = async (req, res,next) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: 'subcategories',       // must match the actual collection name in MongoDB
          localField: '_id',
          foreignField: 'categoryId',
          as: 'subcategories'
        }
      },
      {
        $project: {
          name: 1,
          slug: 1,
          _id:1,
          subcategories: { _id:1,name: 1, slug: 1 }
        }
      }
    ]);

    res.status(200).json({
        success: true,
        message: 'Categories fetched successfully',
        categories
    });
  } catch (err) {
    console.error('Error fetching categories:', err);
    next(err);
  }
};



const getProductsByCategory = async (req, res,next) => {
  try {
    const { categoryId} = req.body;

    if (!categoryId) {
      throw new Error("CategoryId is required." );
    }

    const products = await Product.find({
      category: categoryId,
    })
    // .populate('category', 'name slug')        // Optional: populate category name
    // .populate('subCategory', 'name slug')     // Optional: populate subcategory name
    .lean();

   res.status(200).json({
        success: true,
        message: 'Categories fetched successfully',
        products
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    next(err);
  }
};

const getProductsBySubcategory = async (req, res,next) => {
  try {
    const { subcategoryId} = req.body;

    if (!subcategoryId) {
      throw new Error("subCategoryId is required." );
    }

    const products = await Product.find({
      subCategory: subcategoryId,
    })
    // .populate('category', 'name slug')        // Optional: populate category name
    // .populate('subCategory', 'name slug')     // Optional: populate subcategory name
    .lean();

   res.status(200).json({
        success: true,
        message: 'Categories fetched successfully',
        products
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    next(err);
  }
};


module.exports={getAllCategoriesWithSubcategories,getProductsByCategory,getProductsBySubcategory}