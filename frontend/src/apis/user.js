import axios from "axios";


// Base URL can point to your backend server
const API = axios.create({
  baseURL: (import.meta.env.VITE_PRODUCTION=='true')?null:import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true
});


export const getUser=async(id)=>{

  try {
    const response=await API.get(`/api/user/${id}`)
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        user:response.data.userDetails
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

export const getAllUsers=async(page=1,limit=10,status=null,role=null,search=null)=>{

  try {

    const params={
      page,
      limit,
      status,
      role,
      search
    }
    const response=await API.get(`/api/user/all`,{
      params
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        users:response.data.users,
        totalPages:response.data.totalPages,
        totalUser:response.data.totalUser,
        currentPage:response.data.currentPage
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

export const handleBlock=async(id)=>{
  try {
    const response=await API.put(`/api/user/${id}/block`)
    console.log('response in block api',response)
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

export const handleUnblock=async(id)=>{
  try {
    const response=await API.put(`/api/user/${id}/unblock`)
    console.log('response in unblock api',response)
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

export const UpdateUser=async(data)=>{

  try {
    const response=await API.put(`/api/user/${data._id}`,data)
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        user:response.data.updatedUser
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