import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: 'vi' | 'en';
  setCurrentLanguage: (language: 'vi' | 'en') => void;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translationData = {
  vi: {
    // User Management translations
    userTitle: 'Quản lý Người dùng',
    fullName: 'Họ và tên',
    dateOfBirth: 'Ngày sinh',
    gender: 'Giới tính',
    phone: 'Số điện thoại',
    email: 'Email',
    address: 'Địa chỉ',
    role: 'Vai trò',
    createdAt: 'Ngày tạo',
    actions: 'Thao tác',
    
    // Form actions
    addNew: 'Thêm mới',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    save: 'Lưu',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    
    // Form titles
    addUserTitle: 'Thêm người dùng mới',
    editUserTitle: 'Chỉnh sửa thông tin người dùng',
    
    // Search and filters
    searchUserPlaceholder: 'Tìm kiếm theo tên, email hoặc vai trò...',
    filterByRole: 'Lọc theo vai trò',
    allRoles: 'Tất cả vai trò',
    
    // Messages
    addUserSuccess: 'Thêm người dùng thành công',
    updateUserSuccess: 'Cập nhật thông tin người dùng thành công',
    deleteUserSuccess: 'Xóa người dùng thành công',
    confirmDeleteUser: 'Bạn có chắc chắn muốn xóa người dùng này?',
    noDataFound: 'Không tìm thấy dữ liệu',
    success: 'Thành công',
    error: 'Lỗi',
    
    // Gender options
    male: 'Nam',
    female: 'Nữ',
    other: 'Khác',
    
    // Role options
    patient: 'Bệnh nhân',
    doctor: 'Bác sĩ',
    nurse: 'Điều dưỡng',
    
    // Validation
    required: 'Trường này là bắt buộc',
    invalidEmail: 'Email không hợp lệ',
    invalidPhone: 'Số điện thoại không hợp lệ',
    selectGender: 'Vui lòng chọn giới tính',
    selectRole: 'Vui lòng chọn vai trò',
    
    // Other
    age: 'Tuổi',
    years: 'tuổi',
    contact: 'Liên hệ',
    userInfo: 'Thông tin người dùng'
  },
  en: {
    // User Management translations
    userTitle: 'User Management',
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    phone: 'Phone Number',
    email: 'Email',
    address: 'Address',
    role: 'Role',
    createdAt: 'Created Date',
    actions: 'Actions',
    
    // Form actions
    addNew: 'Add New',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    
    // Form titles
    addUserTitle: 'Add New User',
    editUserTitle: 'Edit User Information',
    
    // Search and filters
    searchUserPlaceholder: 'Search by name, email or role...',
    filterByRole: 'Filter by role',
    allRoles: 'All roles',
    
    // Messages
    addUserSuccess: 'User added successfully',
    updateUserSuccess: 'User information updated successfully',
    deleteUserSuccess: 'User deleted successfully',
    confirmDeleteUser: 'Are you sure you want to delete this user?',
    noDataFound: 'No data found',
    success: 'Success',
    error: 'Error',
    
    // Gender options
    male: 'Male',
    female: 'Female',
    other: 'Other',
    
    // Role options
    patient: 'Patient',
    doctor: 'Doctor',
    nurse: 'Nurse',
    
    // Validation
    required: 'This field is required',
    invalidEmail: 'Invalid email',
    invalidPhone: 'Invalid phone number',
    selectGender: 'Please select gender',
    selectRole: 'Please select role',
    
    // Other
    age: 'Age',
    years: 'years old',
    contact: 'Contact',
    userInfo: 'User Information'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<'vi' | 'en'>('vi');

  const translations = translationData[currentLanguage];

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};