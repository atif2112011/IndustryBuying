import axios from "axios";


// Base URL can point to your backend server
const API = axios.create({
  baseURL: (import.meta.env.VITE_PRODUCTION=='true')?null:import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true
});

export const getMenu=async()=>{

  try {
    const response=await API.get(`/api/categories/menu`)
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        menu:response.data.categories
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
export const getCategories=async({categoryId,populateProducts})=>{

  try {
    const response=await API.post(`/api/categories/get-subcategories`,{slug:categoryId,populateProducts})
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        categories:response.data.data
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

export const getProductsByCategory=async(categoryId)=>{

  try {
    const response=await API.post(`/api/categories/fetch-category`,{
        categoryId
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        products:response.data.products
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

export const getProductsBySubCategory=async(slug)=>{

  try {
    const response=await API.post(`/api/categories/fetch-subcategory`,{
        slug
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        products:response.data.products
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

export const getChartData=async()=>{
  try {
    const response=await API.get(`/api/categories/category-productCount`)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        products:response.data.products
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

export const getCatwithProductandSubCount=async(page=1,limit=10,search=null)=>{
  try {
    const queryParams={
      page,
      limit,
      search
    }
    const response=await API.get(`/api/categories/category-productsubCount`,{params:queryParams})
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        categories:response.data.categories,
        totalCategories:response.data.totalCategories,
        totalPages:response.data.totalPages
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

