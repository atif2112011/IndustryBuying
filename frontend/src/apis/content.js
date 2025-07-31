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
    console.log(formParams)

    formParams.append('name',data.name)
    formParams.append('img',data.img)

    // 
      console.log(formParams)
    //
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
    const response=await API.put(`/api/brands/updateBrand/${data.id}`,formParams)
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

export const DeleteBrand=async(id)=>{

  try {

    const response=await API.delete(`/api/brands/deleteBrand/${id}`)
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

export const AddNewTestimonial = async (data) => {
  try {
    const formParams = new FormData();
    formParams.append("name", data.name);
    formParams.append("designation", data.designation);
    formParams.append("message", data.message);
    formParams.append("logo", data.img);
    formParams.append("company", data.company);


    const response = await API.post(
      `/api/testimonials/addTestimonial`,
      formParams
    );

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        testimonial: response.data.testimonial,
      };
    } else throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};


export const UpdateTestimonial = async (data) => {
  try {
    const formParams = new FormData();
    formParams.append("name", data.name);
    formParams.append("designation", data.designation);
    formParams.append("message", data.message);
    formParams.append("company", data.company);
    if (data.img) formParams.append("logo", data.img);

    const response = await API.put(
      `/api/testimonials/updateTestimonial/${data.id}`,
      formParams
    );

    if (response.data.success)
      return {
        success: true,
        message: response.data.message,
        testimonial: response.data.testimonial,
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



export const DeleteTestimonial = async (id) => {
  try {
    const response = await API.delete(
      `/api/testimonials/deleteTestimonial/${id}`
    );
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
      };
    } else throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};



export const getCertificates=async()=>{

  try {
    const response=await API.get(`/api/certificates/getCertificate`)
    // console.log('response',response)
    if(response.data.success)
      return {
        success:true,
        message:response.data.message,
        certificates:response.data.certifications
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

export const AddNewCertificate = async (data) => {
  try {
    const formParams = new FormData();
    formParams.append("title", data.title);
    formParams.append("description", data.description);
    formParams.append("img", data.img);

    const response = await API.post(
      `/api/certificates/addCertificate`,
      formParams
    );

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        certificate: response.data.certificate,
      };
    } else throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const UpdateCertificate = async (data) => {
  try {
    const formParams = new FormData();
    formParams.append("title", data.title);
    formParams.append("description", data.description);
    if (data.img) formParams.append("img", data.img); // Optional if image updated

    const response = await API.put(
      `/api/certificates/update/${data.id}`,
      formParams
    );

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        certificate: response.data.certificate,
      };
    } else throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};


export const DeleteCertificate = async (id) => {
  try {
    const response = await API.delete(
      `/api/certificates/delete/${id}`
    );
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
      };
    } else throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};
