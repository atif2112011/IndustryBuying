import axios from "axios";


// Base URL can point to your backend server
const API = axios.create({
  baseURL: (import.meta.env.VITE_PRODUCTION=='true')?null:import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true
});


export const getBrandIcons=async()=>{

  try {
    const response=await API.get(`/api/brands/getBrands`)
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        brands:response.data.brands
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

export const AddNewBrand=async(data)=>{

  try {
    const formParams=new FormData()
    formParams.append('name',data.name)
    formParams.append('img',data.img)
    const response=await API.post(`/api/brands/addBrand`,formParams)
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        brand:response.data.brand
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

export const UpdateBrand=async(data)=>{

  try {
    const formParams=new FormData()
    formParams.append('name',data.name)
    formParams.append('img',data.img)
    const response=await API.post(`/api/brands/updateBrand/${data._id}`,formParams)
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        brand:response.data.brand
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

export const DeleteBrand=async(data)=>{

  try {

    const response=await API.post(`/api/brands/deleteBrand/${data._id}`)
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
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

// Testimonials functions
export const getTestimonials=async()=>{

  try {
    const response=await API.get(`/api/testimonials/getTestimonials`)
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        testimonials:response.data.testimonials
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
