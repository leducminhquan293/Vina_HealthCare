import { MedicalStaffWithTranslations } from '../types/medical-staff';

export const mockMedicalStaff: MedicalStaffWithTranslations[] = [
  {
    profile_id: 1,
    user_id: 101,
    experience_years: 8,
    license_number: 'BS001234',
    profile_image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-15T08:30:00Z',
    name: 'Trần Văn Minh',
    email: 'tran.minh@hospital.com',
    status: 'active',
    translations: [
      {
        id: 1,
        profile_id: 1,
        specialization: 'Nội khoa',
        language: 'vi'
      },
      {
        id: 2,
        profile_id: 1,
        specialization: 'Internal Medicine',
        language: 'en'
      }
    ]
  },
  {
    profile_id: 2,
    user_id: 102,
    experience_years: 5,
    license_number: 'DD005678',
    profile_image: 'https://images.unsplash.com/photo-1594824944837-612992c3e3ff?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-02-20T10:15:00Z',
    name: 'Nguyễn Thị Lan',
    email: 'nguyen.lan@hospital.com',
    status: 'inactive',
    translations: [
      {
        id: 3,
        profile_id: 2,
        specialization: 'Điều dưỡng',
        language: 'vi'
      },
      {
        id: 4,
        profile_id: 2,
        specialization: 'Nursing',
        language: 'en'
      }
    ]
  },
  {
    profile_id: 3,
    user_id: 103,
    experience_years: 12,
    license_number: 'BS009876',
    profile_image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-10T14:45:00Z',
    name: 'Lê Hoàng Nam',
    email: 'le.nam@hospital.com',
    status: 'active',
    translations: [
      {
        id: 5,
        profile_id: 3,
        specialization: 'Nhi khoa',
        language: 'vi'
      },
      {
        id: 6,
        profile_id: 3,
        specialization: 'Pediatrics',
        language: 'en'
      }
    ]
  },
  {
    profile_id: 4,
    user_id: 104,
    experience_years: 6,
    license_number: 'BS004567',
    profile_image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-03-05T09:20:00Z',
    name: 'Phạm Thị Hoa',
    email: 'pham.hoa@hospital.com',
    status: 'inactive',
    translations: [
      {
        id: 7,
        profile_id: 4,
        specialization: 'Tim mạch',
        language: 'vi'
      },
      {
        id: 8,
        profile_id: 4,
        specialization: 'Cardiology',
        language: 'en'
      }
    ]
  }
];

export const specializationOptions = {
  vi: [
    { label: 'Nội khoa', value: 'internal_medicine' },
    { label: 'Nhi khoa', value: 'pediatrics' },
    { label: 'Tim mạch', value: 'cardiology' },
    { label: 'Thần kinh', value: 'neurology' },
    { label: 'Điều dưỡng', value: 'nursing' },
    { label: 'Phẫu thuật', value: 'surgery' }
  ],
  en: [
    { label: 'Internal Medicine', value: 'internal_medicine' },
    { label: 'Pediatrics', value: 'pediatrics' },
    { label: 'Cardiology', value: 'cardiology' },
    { label: 'Neurology', value: 'neurology' },
    { label: 'Nursing', value: 'nursing' },
    { label: 'Surgery', value: 'surgery' }
  ]
};