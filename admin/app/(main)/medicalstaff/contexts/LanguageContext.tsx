import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: 'vi' | 'en';
  setCurrentLanguage: (language: 'vi' | 'en') => void;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translationData = {
  vi: {
    title: 'Quản lý Hồ sơ Nhân viên Y tế',
    addNew: 'Thêm mới',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    save: 'Lưu',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    name: 'Họ và tên',
    email: 'Email',
    experienceYears: 'Số năm kinh nghiệm',
    licenseNumber: 'Số giấy phép hành nghề',
    specialization: 'Chuyên môn',
    profileImage: 'Ảnh đại diện',
    createdAt: 'Ngày tạo',
    actions: 'Thao tác',
    confirmDelete: 'Bạn có chắc chắn muốn xóa hồ sơ này?',
    addStaffTitle: 'Thêm nhân viên mới',
    editStaffTitle: 'Chỉnh sửa thông tin nhân viên',
    searchPlaceholder: 'Tìm kiếm theo tên hoặc chuyên môn...',
    noDataFound: 'Không tìm thấy dữ liệu',
    required: 'Trường này là bắt buộc',
    invalidEmail: 'Email không hợp lệ',
    invalidNumber: 'Phải là số',
    success: 'Thành công',
    error: 'Lỗi',
    addSuccess: 'Thêm nhân viên thành công',
    updateSuccess: 'Cập nhật thông tin thành công',
    deleteSuccess: 'Xóa nhân viên thành công'
  },
  en: {
    title: 'Medical Staff Profile Management',
    addNew: 'Add New',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    name: 'Full Name',
    email: 'Email',
    experienceYears: 'Years of Experience',
    licenseNumber: 'License Number',
    specialization: 'Specialization',
    profileImage: 'Profile Image',
    createdAt: 'Created Date',
    actions: 'Actions',
    confirmDelete: 'Are you sure you want to delete this profile?',
    addStaffTitle: 'Add New Staff Member',
    editStaffTitle: 'Edit Staff Information',
    searchPlaceholder: 'Search by name or specialization...',
    noDataFound: 'No data found',
    required: 'This field is required',
    invalidEmail: 'Invalid email',
    invalidNumber: 'Must be a number',
    success: 'Success',
    error: 'Error',
    addSuccess: 'Staff member added successfully',
    updateSuccess: 'Information updated successfully',
    deleteSuccess: 'Staff member deleted successfully'
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