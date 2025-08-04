import axios from "axios";


// Base URL can point to your backend server
const API = axios.create({
  baseURL: (import.meta.env.VITE_PRODUCTION=='true')?null:import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true
});



export const checkEmailNumber=async(email,phone)=>{

  try {
    const response=await API.post("/api/auth/check",{
      email,phone
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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

export const sendOTPtoNumber=async(phone)=>{

  try {
    const response=await API.post("/api/auth/sendOTP",{
      phone
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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
export const sendOTPtoMail=async(email)=>{

  try {
    const response=await API.post("/api/auth/sendOTP",{
      email
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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

export const verifyOTP=async(email,otp)=>{

  try {
    const response=await API.post("/api/auth/verifyOTP",{
      email,
      otp
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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

export const registerUser=async({name,email,password,phone,gstin})=>{

  try {
    const response=await API.post("/api/auth/register",{
      name,
      email,
      password,
      phone,
      gstin

    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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

export const registerGoogleUser=async({name,email,pfp,googleId,phone,gstin})=>{

  try {
    const response=await API.post("/api/auth/register-google",{
      name,
      email,
      pfp,
      googleId,
      phone,
      gstin
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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


export const VerifyUser=async()=>{

  try {
    const response=await API.get("/api/auth/verify-auth")
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        userId:response.data.userId,
        role:response.data.role
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

export const loginUser=async({email,password})=>{

  try {
    const response=await API.post("/api/auth/login",{
      
      email,
      password,
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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
 export const LogoutUser=async()=>{

  try {
    const response=await API.get("/api/auth/logout")
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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


export const ForgotPassword=async({email})=>{

  try {
    const response=await API.post("/api/auth/forgot-password",{
      
      email:email,
    
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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

export const ResetPassword=async({password,token})=>{

  try {
    const response=await API.post(`/api/auth/reset-password/${token}`,{
      
      password:password,
    
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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


export const ChangePassword=async({oldpassword,newpassword})=>{

  try {
    const response=await API.post("/api/auth/reset-password",{
      
      oldpassword,
      newpassword
    
    })
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message
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

