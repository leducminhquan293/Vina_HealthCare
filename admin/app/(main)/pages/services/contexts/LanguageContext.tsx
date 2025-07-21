import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    const translations = getTranslations(language);
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Translation data
const translations = {
  en: {
    admin: {
      title: 'Healthcare Package Management',
      subtitle: 'Manage services, pricing, and features for healthcare packages',
      tabs: {
        services: 'Services',
        prices: 'Service Prices',
        features: 'Features'
      }
    },
    services: {
      title: 'Service Management',
      subtitle: 'Add, edit, delete healthcare services',
      list: 'Service List',
      add: 'Add Service',
      edit: 'Edit Service',
      addNew: 'Add New Service',
      name: 'Service Name',
      description: 'Description',
      icon: 'Icon (Font Awesome)',
      iconPlaceholder: 'e.g., fa-stethoscope',
      iconHint: 'Browse icons at:',
      created: 'Created Date',
      actions: 'Actions',
      confirmDelete: 'Are you sure you want to delete this service?'
    },
    prices: {
      title: 'Service Price Management',
      subtitle: 'Manage pricing tiers for each service',
      list: 'Service Price List',
      add: 'Add Service Price',
      edit: 'Edit Service Price',
      addNew: 'Add New Service Price',
      service: 'Service',
      price: 'Price (VND)',
      priceDescription: 'Price Description',
      priceDescriptionPlaceholder: 'e.g., Nursing once a week',
      popular: 'Popular Package',
      popularBadge: 'Popular',
      created: 'Created Date',
      actions: 'Actions',
      confirmDelete: 'Are you sure you want to delete this price tier?',
      pricesCount: 'price tiers',
      popularCount: 'popular'
    },
    features: {
      title: 'Feature Management',
      subtitle: 'Manage features for each service price tier',
      list: 'Feature List',
      add: 'Add Feature',
      edit: 'Edit Feature',
      addNew: 'Add New Feature',
      pricePackage: 'Price Package',
      name: 'Feature Name',
      namePlaceholder: 'e.g., Personal hygiene care',
      description: 'Feature Description',
      descriptionPlaceholder: 'Detailed description of this feature...',
      created: 'Created Date',
      actions: 'Actions',
      confirmDelete: 'Are you sure you want to delete this feature?',
      featuresCount: 'features',
      pricesCount: 'price packages'
    },
    common: {
      cancel: 'Cancel',
      save: 'Save',
      update: 'Update',
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      id: 'ID',
      name: 'Name',
      description: 'Description',
      price: 'Price',
      actions: 'Actions',
      language: 'Language'
    }
  },
  vi: {
    admin: {
      title: 'Quản trị gói khám bệnh',
      subtitle: 'Quản lý dịch vụ, giá cả và tính năng của các gói khám bệnh',
      tabs: {
        services: 'Dịch vụ',
        prices: 'Giá dịch vụ',
        features: 'Tính năng'
      }
    },
    services: {
      title: 'Quản lý dịch vụ',
      subtitle: 'Thêm, sửa, xóa các dịch vụ khám bệnh',
      list: 'Danh sách dịch vụ',
      add: 'Thêm dịch vụ',
      edit: 'Sửa dịch vụ',
      addNew: 'Thêm dịch vụ mới',
      name: 'Tên dịch vụ',
      description: 'Mô tả',
      icon: 'Tên icon (Font Awesome)',
      iconPlaceholder: 'vd: fa-stethoscope',
      iconHint: 'Tham khảo icon tại:',
      created: 'Ngày tạo',
      actions: 'Thao tác',
      confirmDelete: 'Bạn có chắc chắn muốn xóa dịch vụ này?'
    },
    prices: {
      title: 'Quản lý giá dịch vụ',
      subtitle: 'Quản lý các mức giá cho từng dịch vụ',
      list: 'Danh sách giá dịch vụ',
      add: 'Thêm giá dịch vụ',
      edit: 'Sửa giá dịch vụ',
      addNew: 'Thêm giá dịch vụ mới',
      service: 'Dịch vụ',
      price: 'Giá (VND)',
      priceDescription: 'Mô tả giá',
      priceDescriptionPlaceholder: 'vd: Điều dưỡng 1 lần/tuần',
      popular: 'Gói phổ biến',
      popularBadge: 'Phổ biến',
      created: 'Ngày tạo',
      actions: 'Thao tác',
      confirmDelete: 'Bạn có chắc chắn muốn xóa mức giá này?',
      pricesCount: 'mức giá',
      popularCount: 'phổ biến'
    },
    features: {
      title: 'Quản lý tính năng',
      subtitle: 'Quản lý tính năng cho từng mức giá dịch vụ',
      list: 'Danh sách tính năng',
      add: 'Thêm tính năng',
      edit: 'Sửa tính năng',
      addNew: 'Thêm tính năng mới',
      pricePackage: 'Gói giá dịch vụ',
      name: 'Tên tính năng',
      namePlaceholder: 'vd: Chăm sóc vệ sinh cá nhân',
      description: 'Mô tả tính năng',
      descriptionPlaceholder: 'Mô tả chi tiết về tính năng này...',
      created: 'Ngày tạo',
      actions: 'Thao tác',
      confirmDelete: 'Bạn có chắc chắn muốn xóa tính năng này?',
      featuresCount: 'tính năng',
      pricesCount: 'gói giá'
    },
    common: {
      cancel: 'Hủy',
      save: 'Lưu',
      update: 'Cập nhật',
      add: 'Thêm',
      edit: 'Sửa',
      delete: 'Xóa',
      id: 'ID',
      name: 'Tên',
      description: 'Mô tả',
      price: 'Giá',
      actions: 'Thao tác',
      language: 'Ngôn ngữ'
    }
  }
};

function getTranslations(language: Language) {
  return translations[language];
}