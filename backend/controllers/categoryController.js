const Category = require("../models/categoryModel.js");
const Subcategory = require("../models/subcategoryModel.js");
const Product = require("../models/productModel.js");
const { default: mongoose } = require("mongoose");

const getAllCategoriesWithSubcategories = async (req, res, next) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "subcategories", // must match the actual collection name in MongoDB
          localField: "_id",
          foreignField: "categoryId",
          as: "subcategories",
        },
      },
      {
        $project: {
          name: 1,
          slug: 1,
          _id: 1,
          subcategories: { _id: 1, name: 1, slug: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
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
    const { slug, populateProducts = false } = req.body;

    if (!slug) {
      throw new Error("categorySlug is required.");
    }

    // Step 1: Find category by slug
    const category = await Category.findOne({ slug }).lean();
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Step 2: Find subcategories by category ID
    const subcategories = await Subcategory.find({
      categoryId: category._id,
    })
      .select("_id name slug")
      .lean();

    for (const subcategory of subcategories) {
      if (populateProducts) {
        subcategory.products = await Product.find({
          subCategory: subcategory._id,
        })
          .limit(3)
          .lean();
      }
    }

    res.status(200).json({
      success: true,
      message: "Subcategories fetched successfully",
      data: subcategories,
    });
  } catch (err) {
    console.error("Error fetching subcategories:", err);
    next(err);
  }
};

const getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      throw new Error("CategoryId is required.");
    }

    const products = await Product.find({
      category: categoryId,
    })
      // .populate('category', 'name slug')        // Optional: populate category name
      // .populate('subCategory', 'name slug')     // Optional: populate subcategory name
      .lean();

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    next(err);
  }
};

const getProductsBySubcategory = async (req, res, next) => {
  try {
    const { slug } = req.body;

    if (!slug) {
      throw new Error("Slug is required.");
    }

    // console.log('slug',slug)

    const subcategoryId = await Subcategory.findOne({ slug });
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
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    next(err);
  }
};
const getProductsBySubcategoryFiltered = async (req, res, next) => {
  try {
    let { slug, page, limit, sort, priceRanges, brands, discountRange } =
      req.body;

    //  console.log('req.body',req.body)

    if (!page) page = 1;
    if (!limit) limit = 10;

    // console.log('Price Ranges',priceRanges)
    //   console.log('Brands',brands)
    //   console.log('Discount Range',discountRange
    // )
    const skip = (page - 1) * limit;

    let queryParam = [];

    if (priceRanges) {
      queryParam.push({
        price: { $gte: priceRanges.min, $lte: priceRanges.max },
      });
    }

    if (brands && brands.length > 0) {
      queryParam.push({ brand: { $in: brands } });
    }

    if (discountRange && discountRange.length > 0) {
      const discountFilter = {
        $or: discountRange.map((range) => {
          const [min, max] = range.split("-").map(Number);
          return { discount: { $gte: min, $lte: max } };
        }),
      };
      // console.log('discountFilter',discountFilter)
      queryParam.push(discountFilter);
    }
    
    if(queryParam.length > 0){
      // console.log('queryParam',JSON.stringify(queryParam))
    }

    if (!slug) {
      throw new Error("Slug is required.");
    }

    //Sort Functionality
    let sortParams = {};
    if (sort) {
      if (sort == "New") sortParams = { createdAt: -1 };
      else if (sort == "Price: High to Low") sortParams = { price: -1 };
      else if (sort == "Price: Low to High") sortParams = { price: 1 };
    }

    // console.log('slug',slug)

    const subcategoryId = await Subcategory.findOne({ slug });
    // console.log('subcategoryId',subcategoryId)
    const totalProducts = await Product.countDocuments({
      subCategory: subcategoryId._id,$and:queryParam
    });

    const totalPages = Math.ceil(totalProducts / limit);

    if (page > totalPages && totalProducts > 0)
      throw new Error(`Page ${page} exceeds total pages (${totalPages})`);
    const products = await Product.find({
      subCategory: subcategoryId._id,
      $and:queryParam
    })
      // .populate('category', 'name slug')        // Optional: populate category name
      // .populate('subCategory', 'name slug')     // Optional: populate subcategory name
      .skip(skip)
      .limit(limit)
      .sort(sortParams)
      .lean();
    // console.log('products',products)
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    next(err);
  }
};

const getCategoryProductCount = async (req, res, next) => {
  try {
    const categories = await Category.find();
    const products = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({
          category: category._id,
        });
        return {
          category: category._id,
          name: category.name,
          productCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Products Count fetched successfully",
      products,
    });
  } catch (err) {
    console.error("Error fetching products count", err);
    next(err);
  }
};

const getCategoryAdmin = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || null;

    const query = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }],
        }
      : {};

    const categories = await Category.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 });
    const totalCategories = await Category.countDocuments(query);
    const totalPages = Math.ceil(totalCategories / limit);

    const categorywithProductCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({
          category: category._id,
        });
        return {
          _id: category._id,
          name: category.name,
          productCount,
        };
      })
    );

    const CategorywithProductandSubcategoryCount = await Promise.all(
      categorywithProductCount.map(async (category) => {
        const subcategoryCount = await Subcategory.countDocuments({
          categoryId: category._id,
        });

        const subcategories = await Subcategory.find({
          categoryId: category._id,
        }).lean();

        return {
          _id: category._id,
          name: category.name,
          productCount: category.productCount,
          subcategoryCount,
          subcategories,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories: CategorywithProductandSubcategoryCount,
      totalCategories,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getProductsBySubcategoryFiltered,
  getAllCategoriesWithSubcategories,
  getProductsByCategory,
  getProductsBySubcategory,
  getSubcategories,
  getCategoryProductCount,
  getCategoryAdmin,
};
