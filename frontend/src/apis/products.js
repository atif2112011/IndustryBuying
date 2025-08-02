import axios from "axios";

// Base URL can point to your backend server
const API = axios.create({
  baseURL:
    import.meta.env.VITE_PRODUCTION == "true"
      ? null
      : import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const getAllProducts = async (
  page = 1,
  limit = 10,
  search = null,
  category = null,
  isActive = null
) => {
  try {
    const response = await API.get(`/api/products/`, {
      params: {
        page,
        limit,
        search,
        category,
        isActive,
      },
    });
    // console.log('response',response)
    if (response.data.success)
      return {
        success: true,
        message: response.data.message,
        totalPages: response.data.totalPages,
        totalProducts: response.data.totalProducts,
        products: response.data.products,
        currentpage: response.data.currentpage,
        limit: response.data.limit,
      };
    else throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const AddNewProductAPI = async (data) => {
  try {
    let productDetails = {
      status: data.status,
      category: data.category._id,
      subCategory: data.subcategory._id,
      price: data.price,
      discount: data.discount,
      stock: data.stock,
      gst: data.gst,
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription,
      brand: data.brand,
      rating: data.rating,
      tags: data.tags,
      technicalAspects: data.technicalAspects,
      finalPrice: data.finalPrice,
      cod: data.cod,
      partCod: data.partcod,
      prepaid: data.prepaid,
      return: data.return,

    };
    if(!data.return) productDetails.returnTime=0;
    else productDetails.returnTime=data.returnDays

    const formData = new FormData();
    formData.append("productDetails", JSON.stringify(productDetails));
    if (data.images && data.images.length > 0)
      // your JSON fields
      data.images.forEach((file) => formData.append("images", file)); // multiple files


    const response = await API.post(`/api/products/addProduct`, formData);
    // console.log('response',response)
    if (response.data.success)
      return {
        success: true,
        message: response.data.message,
        product: response.data.product,
      };
    else throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const UpdateProductAPI = async (data) => {
  try {
    console.log('data in UpdateProductAPI',data);
    let productDetails = {
      status: data.status,
      category: data.category._id,
      subCategory: data.subCategory._id,
      price: data.price,
      discount: data.discount,
      gst: data.gst,
      stock: data.stock,
      name: data.name,
      description: data.description,
      shortDescription: data.shortDescription,
      brand: data.brand,
      rating: data.rating,
      tags: data.tags,
      technicalAspects: data.technicalAspects,
      finalPrice: data.finalPrice,
      cod: data.cod,
      partCod: data.partcod,
      prepaid: data.prepaid,
      return: data.return,

    };
    if(!data.return) productDetails.returnTime=0;
    else productDetails.returnTime=data.returnDays
    

    const formData = new FormData();
    formData.append("productDetails", JSON.stringify(productDetails));
    if (data.images && data.images.length > 0)
      // your JSON fields
      data.images.forEach((file) => formData.append("images", file)); // multiple files


    const response = await API.put(`/api/products/update/${data._id}`, formData);
    // console.log('response',response)
    if (response.data.success)
      return {
        success: true,
        message: response.data.message,
        product: response.data.product,
      };
    else throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const DeleteProductAPI = async (id) => {
  try {
    
    const response = await API.delete(`/api/products/delete/${id}`);
    if (response.data.success)
      return {
        success: true,
        message: response.data.message,
      };
    else throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};


export const getProductDetails=async(id)=>{
  try {
    const response=await API.get(`/api/products/${id}`)
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        product:response.data.product
      }
    else
    throw new Error(response.data.message)
    
  } catch (error) {
    console.error(error)
    return {
      success:false,
      message:error?.response?.data?.message ||error.message
    }
  }
}