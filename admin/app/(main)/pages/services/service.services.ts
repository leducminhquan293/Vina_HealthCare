import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const serviceApi = {
  // Lấy tất cả dịch vụ
  getAllServices: async () => {
    const response = await axios.get(`${API_URL}/dm-services`);
    return response.data;
  },

  // Lấy dịch vụ theo danh mục
  getServicesByCategory: async (category:any) => {
    const response = await axios.get(`${API_URL}/dm-services/category/${category}`);
    return response.data;
  },

  // Lấy dịch vụ theo ID
  getServiceById: async (id:any) => {
    const response = await axios.get(`${API_URL}/dm-services/${id}`);
    return response.data;
  },

  // Tạo mới dịch vụ
  createService: async (serviceData:any) => {
    const response = await axios.post(`${API_URL}/dm-services`, serviceData);
    return response.data;
  },

  // Cập nhật dịch vụ
  updateService: async (id:any, serviceData:any) => {
    const response = await axios.put(`${API_URL}/dm-services/${id}`, serviceData);
    return response.data;
  },

  // Xóa dịch vụ
  deleteService: async (id:any) => {
    const response = await axios.delete(`${API_URL}/dm-services/${id}`);
    return response.data;
  },

  getAllPriceServices: async () => {
    try {
      const response = await axios.get(`${API_URL}/dm-price-services`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách DMPriceService:', error);
      throw error;
    }
  },
  createPriceService: async (priceServiceData:any) => {
    try {
      const response = await axios.post(`${API_URL}/dm-price-services`, priceServiceData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo DMPriceService:', error);
      throw error;
    }
  },
  updatePriceService: async (id:any, priceServiceData:any) => {
    try {
      const response = await axios.put(`${API_URL}/dm-price-services/${id}`, priceServiceData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật DMPriceService:', error);
      throw error;
    }
  },
  deletePriceService: async (id:any) => {
    try {
      const response = await axios.delete(`${API_URL}/dm-price-services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xóa DMPriceService:', error);
      throw error;
    }
  },
  getPriceServicesByCategory: async (category:any) => {
    try {
      const response = await axios.get(`${API_URL}/dm-price-services/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy DMPriceService theo danh mục:', error);
      throw error;
    }
  },
  getPriceServiceById: async (id:any) => {
    try {
      const response = await axios.get(`${API_URL}/dm-price-services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy DMPriceService theo ID:', error);
      throw error;
    }
  },
  getAllFeatureServices: async () => {
    try {
      const response = await axios.get(`${API_URL}/dm-feature-services`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách DMFeatureService:', error);
      throw error;
    }
  },
  createFeatureService: async (featureServiceData:any) => {
    try {
      const response = await axios.post(`${API_URL}/dm-feature-services`, featureServiceData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo DMFeatureService:', error);
      throw error;
    }
  },
  updateFeatureService: async (id:any, featureServiceData:any) => {
    try {
      const response = await axios.put(`${API_URL}/dm-feature-services/${id}`, featureServiceData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật DMFeatureService:', error);
      throw error;
    }
  },
  deleteFeatureService: async (id:any) => {
    try {
      const response = await axios.delete(`${API_URL}/dm-feature-services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xóa DMFeatureService:', error);
      throw error;
    }
  },
  getFeatureServicesByCategory: async (category:any) => {
    try {
      const response = await axios.get(`${API_URL}/dm-feature-services/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy DMFeatureService theo danh mục:', error);
      throw error;
    }
  },
  getFeatureServiceById: async (id:any) => {
    try {
      const response = await axios.get(`${API_URL}/dm-feature-services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy DMFeatureService theo ID:', error);
      throw error;
    }
  },
};