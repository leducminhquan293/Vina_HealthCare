export interface Service {
  _id?: string; // Thêm dòng này để hỗ trợ MongoDB
  service_id: number;
  icon: string;
  is_active: boolean;
  name: string;
  description: string;
  name_en: string;
  description_en: string;
  created_at: string;
}

export interface ServicePrice {
  _id?: string; // Thêm dòng này để hỗ trợ MongoDB
  price_id: number;
  service_id: number | string;
  price: number;
  is_popular: boolean;
  is_active: boolean;
  description: string;
  description_en: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceFeature {
  _id?: string | number; // Thêm dòng này để hỗ trợ MongoDB _id
  feature_id: number;
  price_id: number;
  is_active: boolean;
  name: string;
  description: string;
  name_en: string;
  description_en: string;
  icon: string;
  created_at: string;
  updated_at: string;
} 