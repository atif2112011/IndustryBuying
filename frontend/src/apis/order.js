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
export const FetchAllOrdersAdmin = async (page = 1,
  limit = 10,
  search = null,
  status = null,
  date = null) => {
  try {
    const response = await API.get("/api/orders/all",{
      params: {
        page,
        limit,
        search,
        status,
        date,
      },
    });
    // console.log('response',response)
    if (response.data.success)
      return {
        success: true,
        message: response.data.message,
        totalOrders: response.data.totalOrders,
        orders: response.data.orders,
        totalPages: response.data.totalPages,
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


export const UpdateOrderAPI = async (data) => {
  try {
    console.log('data in UpdateOrderAPI',data);

    const formData = new FormData();
    formData.append("status", data.status);
    if (data.invoice)
      // your JSON fields
      formData.append("invoice", data.invoice)


    const response = await API.put(`/api/orders/${data._id}`, formData);
    if (response.data.success)
      return {
        success: true,
        message: response.data.message,
        order: response.data.order,
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