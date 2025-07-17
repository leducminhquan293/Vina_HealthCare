export interface Service {
  service_id: number;
  service_name: string;
  service_name_en?: string;
  description: string;
  description_en?: string;
  icon_name: string;
  created_at: string;
}

export interface ServicePrice {
  price_id: number;
  service_id: number;
  price: number;
  price_description: string;
  price_description_en?: string;
  is_popular: boolean;
  created_at: string;
}

export interface ServiceFeature {
  feature_id: number;
  price_id: number;
  feature_name: string;
  feature_name_en?: string;
  feature_description: string;
  feature_description_en?: string;
  created_at: string;
}

export interface ServiceWithPricing {
  service: Service;
  prices: (ServicePrice & { features: ServiceFeature[] })[];
}