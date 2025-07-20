import { Service, ServicePrice, ServiceFeature, ServiceWithPricing } from '../types/services';

// Mock Services with multi-language support
const services: Service[] = [
  {
    service_id: 1,
    service_name: 'Chăm sóc tại nhà',
    service_name_en: 'Home Care',
    description: 'Dịch vụ chăm sóc sức khỏe tại nhà với đội ngũ y tế chuyên nghiệp',
    description_en: 'Professional home healthcare services with experienced medical staff',
    icon_name: 'fa-home',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    service_id: 2,
    service_name: 'Xét nghiệm máu',
    service_name_en: 'Blood Test',
    description: 'Dịch vụ xét nghiệm máu đầy đủ với kết quả nhanh chóng và chính xác',
    description_en: 'Comprehensive blood testing services with fast and accurate results',
    icon_name: 'fa-vial',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    service_id: 3,
    service_name: 'Khám tổng quát',
    service_name_en: 'General Checkup',
    description: 'Gói khám sức khỏe tổng quát với các chỉ số cơ bản và nâng cao',
    description_en: 'Comprehensive health checkup package with basic and advanced indicators',
    icon_name: 'fa-stethoscope',
    created_at: '2024-01-15T10:30:00Z'
  }
];

// Mock Service Prices with multi-language support
const servicePrices: ServicePrice[] = [
  // Chăm sóc tại nhà / Home Care
  {
    price_id: 1,
    service_id: 1,
    price: 500000,
    price_description: 'Điều dưỡng 1 lần/tuần',
    price_description_en: 'Nursing once a week',
    is_popular: false,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    price_id: 2,
    service_id: 1,
    price: 1500000,
    price_description: 'Điều dưỡng 3 lần/tuần',
    price_description_en: 'Nursing 3 times a week',
    is_popular: true,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    price_id: 3,
    service_id: 1,
    price: 2500000,
    price_description: 'Điều dưỡng hàng ngày',
    price_description_en: 'Daily nursing care',
    is_popular: false,
    created_at: '2024-01-15T10:30:00Z'
  },
  // Xét nghiệm máu / Blood Test
  {
    price_id: 4,
    service_id: 2,
    price: 300000,
    price_description: 'Xét nghiệm cơ bản',
    price_description_en: 'Basic blood test',
    is_popular: false,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    price_id: 5,
    service_id: 2,
    price: 800000,
    price_description: 'Xét nghiệm nâng cao',
    price_description_en: 'Advanced blood test',
    is_popular: true,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    price_id: 6,
    service_id: 2,
    price: 1200000,
    price_description: 'Xét nghiệm toàn diện',
    price_description_en: 'Comprehensive blood test',
    is_popular: false,
    created_at: '2024-01-15T10:30:00Z'
  },
  // Khám tổng quát / General Checkup
  {
    price_id: 7,
    service_id: 3,
    price: 1000000,
    price_description: 'Khám cơ bản',
    price_description_en: 'Basic checkup',
    is_popular: false,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    price_id: 8,
    service_id: 3,
    price: 2000000,
    price_description: 'Khám nâng cao',
    price_description_en: 'Advanced checkup',
    is_popular: true,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    price_id: 9,
    service_id: 3,
    price: 3500000,
    price_description: 'Khám VIP',
    price_description_en: 'VIP checkup',
    is_popular: false,
    created_at: '2024-01-15T10:30:00Z'
  }
];

// Mock Service Features with multi-language support
const serviceFeatures: ServiceFeature[] = [
  // Chăm sóc tại nhà - Gói 1 / Home Care - Package 1
  {
    id: 1,
    price_id: 1,
    name: 'Chăm sóc vệ sinh cá nhân',
    name_en: 'Personal hygiene care',
    description: 'Hỗ trợ vệ sinh cá nhân hàng ngày',
    description_en: 'Daily personal hygiene assistance',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    price_id: 1,
    name: 'Theo dõi dấu hiệu sinh tồn',
    name_en: 'Vital signs monitoring',
    description: 'Kiểm tra huyết áp, nhịp tim, nhiệt độ',
    description_en: 'Blood pressure, heart rate, temperature monitoring',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 3,
    price_id: 1,
    name: 'Tư vấn dinh dưỡng',
    name_en: 'Nutrition counseling',
    description: 'Lời khuyên về chế độ ăn uống phù hợp',
    description_en: 'Advice on appropriate diet and nutrition',
    created_at: '2024-01-15T10:30:00Z'
  },
  // Chăm sóc tại nhà - Gói 2 / Home Care - Package 2
  {
    id: 4,
    price_id: 2,
    name: 'Chăm sóc vệ sinh cá nhân',
    name_en: 'Personal hygiene care',
    description: 'Hỗ trợ vệ sinh cá nhân hàng ngày',
    description_en: 'Daily personal hygiene assistance',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 5,
    price_id: 2,
    name: 'Theo dõi dấu hiệu sinh tồn',
    name_en: 'Vital signs monitoring',
    description: 'Kiểm tra huyết áp, nhịp tim, nhiệt độ',
    description_en: 'Blood pressure, heart rate, temperature monitoring',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 6,
    price_id: 2,
    name: 'Tư vấn dinh dưỡng',
    name_en: 'Nutrition counseling',
    description: 'Lời khuyên về chế độ ăn uống phù hợp',
    description_en: 'Advice on appropriate diet and nutrition',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 7,
    price_id: 2,
    name: 'Vật lý trị liệu cơ bản',
    name_en: 'Basic physiotherapy',
    description: 'Bài tập phục hồi chức năng',
    description_en: 'Rehabilitation exercises',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 8,
    price_id: 2,
    name: 'Hỗ trợ 24/7',
    name_en: '24/7 Support',
    description: 'Tư vấn y tế qua điện thoại',
    description_en: 'Medical consultation via phone',
    created_at: '2024-01-15T10:30:00Z'
  },
  // More features for other packages...
  {
    id: 9,
    price_id: 3,
    name: 'Tất cả tính năng gói nâng cao',
    name_en: 'All advanced package features',
    description: 'Bao gồm tất cả dịch vụ của gói trước',
    description_en: 'Includes all services from previous package',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 10,
    price_id: 3,
    name: 'Chăm sóc chuyên sâu',
    name_en: 'Specialized care',
    description: 'Điều dưỡng chuyên khoa',
    description_en: 'Specialized nursing care',
    created_at: '2024-01-15T10:30:00Z'
  },
  // Blood test features
  {
    id: 11,
    price_id: 4,
    name: 'Công thức máu',
    name_en: 'Complete blood count',
    description: 'Đếm tế bào máu đầy đủ',
    description_en: 'Full blood cell count analysis',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 12,
    price_id: 4,
    name: 'Đường huyết',
    name_en: 'Blood glucose',
    description: 'Kiểm tra mức glucose trong máu',
    description_en: 'Blood glucose level testing',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 13,
    price_id: 5,
    name: 'Chức năng gan',
    name_en: 'Liver function',
    description: 'ALT, AST, Bilirubin',
    description_en: 'ALT, AST, Bilirubin testing',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 14,
    price_id: 5,
    name: 'Chức năng thận',
    name_en: 'Kidney function',
    description: 'Creatinine, Urea, Acid uric',
    description_en: 'Creatinine, Urea, Uric acid testing',
    created_at: '2024-01-15T10:30:00Z'
  }
];

// Function to combine data
export function getServicesWithPricing(): ServiceWithPricing[] {
  return services.map(service => ({
    service,
    prices: servicePrices
      .filter(price => price.service_id === service.service_id)
      .map(price => ({
        ...price,
        features: serviceFeatures.filter(feature => feature.price_id === price.price_id)
      }))
  }));
}

// Export individual arrays for admin components
export { services, servicePrices, serviceFeatures };