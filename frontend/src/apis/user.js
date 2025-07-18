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