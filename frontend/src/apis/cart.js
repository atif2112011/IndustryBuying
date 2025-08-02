import axios from "axios";

// Base URL can point to your backend server
const API = axios.create({
  baseURL:
    import.meta.env.VITE_PRODUCTION == "true"
      ? null
      : import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export const getCart=async()=>{
  try {
    const response=await API.get('/api/cart')
    if(response.data.success)
    {
        return {
            success:true,
            message:response.data.message,
            cart:response.data.cart.items,
            totalGst:response.data.cart.totalGst,
            totalPrice:response.data.cart.totalPrice,
            totalItems:response.data.cart.totalItems
        }
    }
    else
    {
        throw new Error(response.data.message)
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
  
}

export const upDateCartItem=async(product)=>{
  try {
    const response=await API.put(`/api/cart/item/${product.productId}`,{
        quantity:product.quantity
    })
    if(response.data.success)
    {
        return {
            success:true,
            message:response.data.message,
            cart:response.data.cart.items,
            totalItems:response.data.cart.totalItems,
            totalGst:response.data.cart.totalGst,
            totalPrice:response.data.cart.totalPrice
        }
    }
    else
    {
        throw new Error(response.data.message)
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
  
}

export const RemoveCartItem=async(product)=>{
  try {
    const response=await API.delete(`/api/cart/item/${product.productId}`)
    if(response.data.success)
    {
        return {
            success:true,
            message:response.data.message,
            cart:response.data.cart.items,
            totalItems:response.data.cart.totalItems,
            totalGst:response.data.cart.totalGst,
            totalPrice:response.data.cart.totalPrice

        }
    }
    else
    {
        throw new Error(response.data.message)
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
  
}

export const addToCart=async(productId,quantity)=>{
  try {
    const response=await API.post('/api/cart/add',{
        productId,
        quantity
    })
    if(response.data.success)
    {
        return {
            success:true,
            message:response.data.message,
            cart:response.data.cart.items,
            totalItems:response.data.cart.totalItems
        }
    }
    else
    {
        throw new Error(response.data.message)
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
  
}

export const deleteCart=async()=>{
  try {
    const response=await API.delete('/api/cart/clear')
    if(response.data.success)
    {
        return {
            success:true,
            message:response.data.message
        }
    }
    else
    {
        throw new Error(response.data.message)
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
}