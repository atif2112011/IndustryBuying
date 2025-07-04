import axios from "axios";


// Base URL can point to your backend server
const API = axios.create({
  baseURL: (import.meta.env.VITE_PRODUCTION==true)?"":import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
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