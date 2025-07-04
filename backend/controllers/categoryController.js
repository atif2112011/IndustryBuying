const Category = require( '../models/categoryModel.js');
const Subcategory= require ('../models/subcategoryModel.js');
const Product =require('../models/productModel.js');
const { default: mongoose } = require('mongoose');

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

// const getSubcategories = async (req, res, next) => {
//   try {
//     const { categoryId, skip = 0, limit = 50 } = req.body;

//     if (!categoryId) {
//       throw new Error("categoryId is required.");
//     }

//     const subcategories = await Subcategory.find({
//       categoryId: categoryId
//     })
//       .select('_id name slug') // only return necessary fields
//       .skip(Number(skip))
//       .limit(Number(limit))
//       .lean();

//       if(subcategories.length === 0) throw new Error("Invalid categoryId not found");

//     res.status(200).json({
//       success: true,
//       message: 'Subcategories fetched successfully',
//       data: subcategories,
//     });
//   } catch (err) {
//     console.error("Error fetching subcategories:", err);
//     next(err);
//   }
// };
const getSubcategories = async (req, res, next) => {
  try {
    const { slug, populateProducts=false } = req.body;

    if (!slug) {
      throw new Error("categorySlug is required.");
    }

    // Step 1: Find category by slug
    const category = await Category.findOne({ slug }).lean();
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Step 2: Find subcategories by category ID
    const subcategories = await Subcategory.find({
      categoryId: category._id,
    })
      .select('_id name slug')
      .lean();

      for(const subcategory of subcategories) {
        if (populateProducts) {
          subcategory.products = await Product.find({ subCategory: subcategory._id }).limit(3).lean();
        }
      }

    res.status(200).json({
      success: true,
      message: 'Subcategories fetched successfully',
      data: subcategories,
    });
  } catch (err) {
    console.error("Error fetching subcategories:", err);
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
    const { slug} = req.body;

    if (!slug) {
      throw new Error("Slug is required." );
    }

    // console.log('slug',slug)

    const subcategoryId = await Subcategory.findOne({slug})
    // console.log('subcategoryId',subcategoryId)

    const products = await Product.find({
      subCategory: subcategoryId._id,
    })
    // .populate('category', 'name slug')        // Optional: populate category name
    // .populate('subCategory', 'name slug')     // Optional: populate subcategory name
    .lean();
    // console.log('products',products)
   res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        products
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    next(err);
  }
};


module.exports={getAllCategoriesWithSubcategories,getProductsByCategory,getProductsBySubcategory,getSubcategories}