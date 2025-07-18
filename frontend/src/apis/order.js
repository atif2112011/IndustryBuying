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

export const FetchAllOrders = async () => {
  try {
    const response = await API.get("/api/orders");
    // console.log('response',response)
    if (response.data.success)
      return {
        success: true,
        message: response.data.message,
        totalOrders: response.data.totalOrders,
        orders: response.data.orders,
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
export const FetchAllOrdersAdmin = async () => {
  try {
    const response = await API.get("/api/orders/all");
    // console.log('response',response)
    if (response.data.success)
      return {
        success: true,
        message: response.data.message,
        totalOrders: response.data.totalOrders,
        orders: response.data.orders,
        totalPages: response.data.totalPages,
        totalOrders: response.data.totalOrders,
        currentPage: response.data.currentPage,
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
