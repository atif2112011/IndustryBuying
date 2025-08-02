const { cloudinary } = require("../config/cloudinary");
const Product = require("../models/productModel");

// const getProducts = async(req,res,next)=>{
//     try {
//       let { page, limit } = req.query;
//       page = parseInt(page)||1;
//       limit = parseInt(limit)||12;

//       // cal skip logic // based on page no skip that much docs
//       let skip = (page - 1) * limit;

//       const totalProducts = await Product.countDocuments();

//       const totalPages = Math.ceil(totalProducts / limit);

//       // If page number exceeds total pages and products exist
//       if (page > totalPages && totalProducts > 0)
//         throw new Error(`Page ${page} exceeds total pages (${totalPages})`);

//       // get paginated products
//       const products = await Product.find({}).skip(skip).limit(limit).populate("category").populate("subCategory");

//       if (!products) throw new Error("Products not found");

//       res
//         .json({
//           message: "Products fetched successfully",
//           success: true,
//           totalPages,
//           totalProducts,
//           currentPage:page,
//           limit,
//           products:products,
//         })
//         .status(200);
//     } catch (error) {
//         next(error)
//     }
// }
const getProducts = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 12,
      search,
      category,
      isActive,
      date, // 🆕 Expecting 'YYYY-MM-DD' from frontend
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const query = {};

    // 🔍 Search by product name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        
      ];
    }

    // 📦 Filter by category
    if (category) {
      query.category = category;
    }

    // ✅ Filter by active status
    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // 📅 Filter by exact created date (ignoring time)
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      query.createdAt = { $gte: start, $lte: end };
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    if (page > totalPages && totalProducts > 0)
      throw new Error(`Page ${page} exceeds total pages (${totalPages})`);

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .populate("category")
      .populate("subCategory")
      .sort({ createdAt: -1 });

    if (!products) throw new Error("Products not found");

    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      totalPages,
      totalProducts,
      currentPage: page,
      limit,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getShowcaseProducts = async (req, res, next) => {
  try {
    // fetch tags ,page,limit,sort,query
    let { tags, sort, page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 12;
    const skip = (page - 1) * limit;

    const tag = tags ? tags.split(",") : ["showcase"];

    const totalProducts = await Product.countDocuments({
      tags: { $in: tag },
    });

    const totalPages = Math.ceil(totalProducts / limit);

    if (page > totalPages && totalProducts > 0)
      throw new Error(`Page ${page} does not exist`);

    const query = Product.find({ tags: { $in: tag } })
      .skip(skip)
      .limit(limit);

    if (sort != null) query.sort(sort);

    const products = await query;

    return res
      .json({
        message: "products fetched",
        success: true,
        products: products,
        totalProducts,
        totalPages,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
};

const getRecommended = async (req, res, next) => {
  try {
    // Optional: Extract user info from req.user if needed
    let { limit, page } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 12;
    const skip = (page - 1) * limit;

    // Static logic: return products tagged as "recommended"
    const products = await Product.find({
      tags: { $in: ["recommended"] },
    })
      .limit(limit)
      .skip(skip);
    // limit to 12 recommendations

    if (!products) throw new Error("No Products recommended available ");

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getBestSellers = async (req, res, next) => {
  try {
    let { limit, page } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 12;
    const skip = (page - 1) * limit;
    // Static logic: return products tagged as "bestsellers"
    const products = await Product.find({
      tags: { $in: ["bestsellers", "bestseller"] },
    })
      .limit(limit)
      .skip(skip);

    // limit to 12 recommendations

    if (!products) throw new Error("No  BestSellers Products  available ");

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// const searchProducts = async (req, res, next) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 12;
//     const skip = (page - 1) * limit;
//     const sort = req.query.sort || null;

//     // const category = req.query.category;
//     // const brand = req.query.brand;

//     const rawKeyword = req.query.q || "";
//     const keywords = rawKeyword
//       .split(",")
//       .map((kw) => kw.trim())
//       .filter(Boolean); // removes empty strings

//     const searchConditions = [];

//     if (keywords.length > 0) {
//       keywords.forEach((word) => {
//         searchConditions.push(
//           { name: { $regex: word, $options: "i" } },
//           { brand: { $regex: word, $options: "i" } },
//           { description: { $regex: word, $options: "i" } },
//           { tags: { $regex: word, $options: "i" } }
//         );
//       });
//     }

//     // Final search filter
//     const searchFilter =
//       searchConditions.length > 0 ? { $or: searchConditions } : {};

//     // // Add category and brand if present
//     // if (category) searchFilter.category = category;
//     // if (brand) searchFilter.brand = brand;

//     const totalProducts = await Product.countDocuments(searchFilter);
//     const totalPages = Math.ceil(totalProducts / limit);

//     if (page > totalPages && totalProducts > 0) {
//       throw new Error(`Page ${page} exceeds total pages (${totalPages})`);
//     }

//     let query = Product.find(searchFilter).skip(skip).limit(limit);

//     if (sort) query = query.sort(sort);

//     const products = await query;

//     if (!products) throw new Error("Error in getting Products");

//     res.status(200).json({
//       products,
//       totalProducts,
//       totalPages,
//       currentPage: page,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const searchProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || null;

   

      const searchTerm = req.query.q || "";


    const searchFilter =
      searchTerm!=="" ? {
  $or: [
    { name: { $regex: searchTerm, $options: "i" } },
    { description: { $regex: searchTerm, $options: "i" } },
    { shortDescription: { $regex: searchTerm, $options: "i" } },
    { brand: { $regex: searchTerm, $options: "i" } }
  ]
} : {};

  console.log("Search Filter:", searchFilter);

    const totalProducts = await Product.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalProducts / limit);

    if (page > totalPages && totalProducts > 0) {
      throw new Error(`Page ${page} exceeds total pages (${totalPages})`);
    }

    let query = Product.find(searchFilter).skip(skip).limit(limit);

    if (sort) query = query.sort(sort);

    const products = await query;

    if (!products) throw new Error("Error in getting Products");

    res.status(200).json({
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

const productDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No id received");

    const productInfo = await Product.findById(id).populate(
      "category subCategory"
    );

    if (!productInfo) throw new Error("product not found");

    return res
      .json({ message: "product details", success: true, product:productInfo })
      .status(200);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    // const{role} = req.user

    const role = "admin"; // hardcoding for now

    if (role !== "admin") throw "Not Have Acccess to Add Products";

    const productDetails = JSON.parse(req.body.productDetails);
    // console.log('req.body',req.body.productDetails)

    // Validate required fields
    if (
      !productDetails.name ||
      !productDetails.price ||
      !productDetails.category ||
      !productDetails.subCategory
    )
      throw new Error("Name, price, category, and subCategory are required.");

    const existing = await Product.findOne({ name: productDetails.name });

    if (existing) throw new Error("Already Exist Product");

    //Cloudinary Image Upload
    // Upload all files to Cloudinary and get URLs
    const imageUrls = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "products",
              public_id: file.originalname.split(".")[0], // optional: use file name
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(file.buffer); // send buffer to Cloudinary
      });

      imageUrls.push(result.secure_url);
    }

    const newProduct = await Product.create({
      ...productDetails,
      images: imageUrls,
    });
    const populatedProduct = await Product.findById(newProduct._id)
      .populate("category")
      .populate("subCategory");

    return res
      .json({
        product: populatedProduct,
        message: "added new product",
        success: true,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
};

// const updateProductAdmin = async (req, res,next) => {
//   try {
//     // const{role} = req.user

//     const role = "admin"; // hardcoding for now

//     if (role !== "admin") throw new Error("Not Have Acccess to Add Products");

//     const { id } = req.params;
//     const productDetails  = JSON.parse(req.body.productDetails);

//     //Cloudinary Image Upload
//     // Upload all files to Cloudinary and get URLs
//     const imageUrls = [];

//     for (const file of req.files) {
//       const result = await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//           {
//             resource_type: "image",
//             folder: "products",
//             public_id: file.originalname.split('.')[0], // optional: use file name
//           },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         ).end(file.buffer); // send buffer to Cloudinary
//       });

//       imageUrls.push(result.secure_url);
//     }
//     const updates = {...productDetails,images:imageUrls};

//     const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
//       new: true
//     });

//     if (!updatedProduct) throw new Error("Product not found");

//     res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       product: updatedProduct,
//     });
//   } catch (error) {
//     next(error)
//   }
// };
const updateProductAdmin = async (req, res, next) => {
  try {
    const role = "admin"; // hardcoding for now
    if (role !== "admin") {
      throw new Error("You do not have access to update products");
    }

    const { id } = req.params;
    const productDetails = JSON.parse(req.body.productDetails);

    // 1. Fetch the product to get old image URLs
    const previousProduct = await Product.findById(id);
    if (!previousProduct) {
      throw new Error("Product not found");
    }

    // 2. If new files are uploaded, delete the old images from Cloudinary
    if (req.files && req.files.length > 0) {
      // Helper to extract public_id from a Cloudinary URL
      const getPublicId = (url) => {
        // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v12345/products/image_id.jpg
        // We need to extract "products/image_id"
        const parts = url.split("/");
        const publicIdWithExtension = parts
          .slice(parts.indexOf("products"))
          .join("/");
        return publicIdWithExtension.split(".")[0];
      };

      if (previousProduct.images && previousProduct.images.length > 0) {
        const publicIdsToDelete = previousProduct.images.map(getPublicId);
        // Use Cloudinary's bulk delete API
        await cloudinary.api.delete_resources(publicIdsToDelete);
      }
    }

    // 3. Upload new images to Cloudinary (if any)
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: "products",
                public_id: file.originalname.split(".")[0],
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(file.buffer);
        });
        imageUrls.push(result.secure_url);
      }
    }

    // 4. Prepare the updates object
    // Start with text details
    const updates = { ...productDetails };
    // Only add the 'images' field if new images were uploaded
    if (imageUrls.length > 0) {
      updates.images = imageUrls;
    }

    // 5. Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true,
    })
      .populate("category")
      .populate("subCategory");

    // The previous check for product existence is now at the top
    // but we can keep this one as a final safeguard.
    if (!updatedProduct) {
      throw new Error("Product not found or failed to update");
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
const deleteProductAdmin = async (req, res, next) => {
  try {
    // const{role} = req.user

    const role = "admin"; // hardcoding for now

    if (role !== "admin")
      throw new Error("Not Have Acccess to Delete Products");

    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw new Error("Product Not Found");
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getShowcaseProducts,
  getRecommended,
  getBestSellers,
  searchProducts,
  productDetails,
  addProduct,
  updateProductAdmin,
  deleteProductAdmin,
};
