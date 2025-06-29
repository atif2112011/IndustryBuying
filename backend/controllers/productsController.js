const Product = require("../models/productModel")

const getProducts = async(req,res,next)=>{
    try {
      const { page, limit } = req.query;
      page = parseInt(page)||1;
      limit = parseInt(limit)||12;

      // cal skip logic // based on page no skip that much docs
      let skip = (page - 1) * limit;

      const totalProducts = await Product.countDocuments();

      const totalPages = Math.ceil(totalProducts / limit);

      // If page number exceeds total pages and products exist
      if (page > totalPages && totalProducts > 0) 
        throw new Error(`Page ${page} exceeds total pages (${totalPages})`);

      // get paginated products
      const products = await Product.find({}).skip(skip).limit(limit);

      if (!products) throw new Error("Products not found");


      res
        .json({
          message: "Products fetched successfully",
          success: true,
          totalPages,
          totalProducts,
          currentPage:page,
          limit,
          products:products,
        })
        .status(200);
    } catch (error) {
        next(error)
    }
}

const getShowcaseProducts = async(req,res,next)=>{
    try {

        // fetch tags ,page,limit,sort,query 
        const {tags,sort,page,limit}=req.query
        
        page = parseInt(page) || 1
        limit = parseInt(limit) || 12
        const skip = (page-1)*limit
        
        const totalProducts = await Product.countDocuments({
          tags: { $in: [tag] },
        });


        const totalPages = Math.ceil(totalProducts/limit);

        if(page>totalPages && totalProducts>0)
          throw new Error(`Page ${page} does not exist`)
        

        const tag = tags? tags.split(','): ["bestseller"]

        const query = Product.find({tags:{$in:tag}}).skip(skip).limit(limit)

        if(sort!=null)
          query.sort(sort)        
 
        const products = await query;

        return res.json({message:"products fetched",success:true,products:products,totalProducts,totalPages}).status(200)
         
              
    } catch (error) {
        next(error)
    }
}

const getRecommended=async (req,res,next)=>{
  try {
    // Optional: Extract user info from req.user if needed
    const userId = req.user.userId;

    // Static logic: return products tagged as "recommended"
    const products = await Product.find({
      tags: { $in: ["recommended"] },
    }).limit(12); 
    // limit to 12 recommendations

    if(!products)
      throw new Error("No Products recommended available ")


    res.status(200).json({
      success: true,
      recommendedFor: userId,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
} 

const getBestSellers = async (req, res, next) => {
  try {

    // Static logic: return products tagged as "bestsellers"
    const products = await Product.find({
      tags: { $in: ["bestsellers"] },
    }).limit(12);

    // limit to 12 recommendations

    if (!products) throw new Error("No  BestSellers Products  available ");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
}; 

const searchProducts = async (req, res,next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || null;

    const category = req.query.category;
    const brand = req.query.brand;

    const rawKeyword = req.query.q || "";
    const keywords = rawKeyword
      .split(",")
      .map((kw) => kw.trim())
      .filter(Boolean); // removes empty strings

    const searchConditions = [];

    if (keywords.length > 0) {
      keywords.forEach((word) => {
        searchConditions.push(
          { name: { $regex: word, $options: "i" } },
          { description: { $regex: word, $options: "i" } },
          { tags: { $regex: word, $options: "i" } }
        );
      });
    }

    // Final search filter
    const searchFilter =
      searchConditions.length > 0 ? { $or: searchConditions } : {};

    // Add category and brand if present
    if (category) searchFilter.category = category;
    if (brand) searchFilter.brand = brand;

    const totalProducts = await Product.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalProducts / limit);

    if (page > totalPages && totalProducts > 0) {
     throw new Error(`Page ${page} exceeds total pages (${totalPages})`);
    }

    let query = Product.find(searchFilter).skip(skip).limit(limit);

    if (sort) query = query.sort(sort);

    const products = await query;

    if(!products)
      throw new Error("Error in getting Products")

    res.status(200).json({
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
     next(error)
  }
};


const productDetails = async(req,res,next)=>{
  try {
     const{slug} = req.params
    
     if(!slug)
      throw new Error("No id received")

     const productInfo = await Product.findById(slug)
     
     if(!productInfo)
      throw new Error("product not found");

     return res.json({message:"product details",success:true,productInfo}).status(200)

  } catch (error) {
    next(error)
  }
}

const addProduct = async(req,res,next)=>{
  try {
    // const{role} = req.user

    const role = "admin"; // hardcoding for now

    if (role !== "admin") throw "Not Have Acccess to Add Products";

    const { productDetails } = req.body;

    // Validate required fields
    if (
      !productDetails.name ||
      !productDetails.price ||
      !productDetails.category ||
      !productDetails.subCategory
    ) 
      throw new Error("Name, price, category, and subCategory are required.");
    

    const existing = await Product.findOne({ name });
    
    if (existing) 
      throw new Error("Already Exist Product");
    

    const newProduct = await Product.create(productDetails);


    return res.json({product:newProduct,message:"added new product",success:true}).status(200)
  } catch (error) {
    next(error)
  }
}

const updateProductAdmin = async (req, res,next) => {
  try {
    // const{role} = req.user

    const role = "admin"; // hardcoding for now

    if (role !== "admin") throw "Not Have Acccess to Add Products";

    const { id } = req.params;
    const { updates } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) throw new Error("Product not found");

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error)
  }
};

const deleteProductAdmin = async (req, res,next) => {
  try {
    // const{role} = req.user

    const role = "admin"; // hardcoding for now

    if (role !== "admin") throw "Not Have Acccess to Add Products";

    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw new Error ("Product Not Found")
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error)
  }
};



module.exports={getProducts,getShowcaseProducts,getRecommended,getBestSellers,searchProducts,productDetails,addProduct,updateProductAdmin,deleteProductAdmin}