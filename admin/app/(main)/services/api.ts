import axios from 'axios';
import { Service, ServicePrice, ServiceFeature } from './types';

const API_BASE = 'http://localhost:3001';

// Service APIs
export const getServices = async (): Promise<Service[]> => {
  const res = await axios.get(`${API_BASE}/dm-services`);
  return res.data;
};
export const addService = async (data: Partial<Service>): Promise<Service> => {
  // Map đúng DTO
  const payload = {
    name: data.name,
    description: data.description,
    name_en: data.name_en,
    description_en: data.description_en,
    icon: data.icon,
    is_active: data.is_active, // Thêm dòng này
  };
  const res = await axios.post(`${API_BASE}/dm-services`, payload);
  return res.data;
};
export const editService = async (id: string | number, data: Partial<Service>): Promise<Service> => {
  const payload = {
    name: data.name,
    description: data.description,
    name_en: data.name_en,
    description_en: data.description_en,
    icon: data.icon,
    is_active: data.is_active, // Thêm dòng này
  };
  const res = await axios.put(`${API_BASE}/dm-services/${id}`, payload);
  return res.data;
};
export const deleteService = async (id: string | number): Promise<void> => {
  await axios.delete(`${API_BASE}/dm-services/${id}`);
};

// Price APIs
export const getServicePrices = async (): Promise<ServicePrice[]> => {
  const res = await axios.get(`${API_BASE}/dm-price-services`);
  return res.data;
};
export const addPrice = async (data: Partial<ServicePrice>): Promise<ServicePrice> => {
  const payload = {
    service_id: String(data.service_id),
    price: data.price,
    description: data.description,
    description_en: data.description_en,
    is_popular: data.is_popular,
  };
  const res = await axios.post(`${API_BASE}/dm-price-services`, payload);
  return res.data;
};
export const editPrice = async (id: string | number, data: Partial<ServicePrice>): Promise<ServicePrice> => {
  const payload = {
    service_id: String(data.service_id),
    price: data.price,
    description: data.description,
    description_en: data.description_en,
    is_popular: data.is_popular,
  };
  const res = await axios.put(`${API_BASE}/dm-price-services/${id}`, payload);
  return res.data;
};
export const deletePrice = async (id: string | number): Promise<void> => {
  await axios.delete(`${API_BASE}/dm-price-services/${id}`);
};

// Feature APIs
export const getServiceFeatures = async (): Promise<ServiceFeature[]> => {
  const res = await axios.get(`${API_BASE}/dm-feature-services`);
  return res.data;
};
export const addFeature = async (data: Partial<ServiceFeature>): Promise<ServiceFeature> => {
  const payload = {
    price_id: data.price_id,
    name: data.name,
    description: data.description,
    name_en: data.name_en,
    description_en: data.description_en,
    icon: data.icon,
  };
  const res = await axios.post(`${API_BASE}/dm-feature-services`, payload);
  return res.data;
};
export const editFeature = async (id: number | string, data: Partial<ServiceFeature>): Promise<ServiceFeature> => {
  const payload = {
    price_id: data.price_id,
    name: data.name,
    description: data.description,
    name_en: data.name_en,
    description_en: data.description_en,
    icon: data.icon,
  };
  const res = await axios.put(`${API_BASE}/dm-feature-services/${id}`, payload);
  return res.data;
};
export const deleteFeature = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/dm-feature-services/${id}`);
}; 