export interface Service {
  _id: number;
  name: string;
  name_en?: string;
  description: string;
  description_en?: string;
  icon: string;
  createdAt: string;
}

export interface ServicePrice {
  _id: number;
  service_id: number;
  price: number;
  description: string;
  description_en?: string;
  is_popular: boolean;
  createdAt: string;
}

export interface ServiceFeature {
  _id: number;
  price_id: number;
  name: string;
  name_en?: string;
  description: string;
  description_en?: string;
  createdAt: string;
}

export interface ServiceWithPricing {
  service: Service;
  prices: (ServicePrice & { features: ServiceFeature[] })[];
}