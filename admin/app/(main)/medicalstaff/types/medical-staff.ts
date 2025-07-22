export interface MedicalStaffProfile {
  profile_id: number;
  user_id: number;
  experience_years: number;
  license_number: string;
  profile_image: string;
  created_at: string;
  name?: string; // Thêm từ bảng Users
  email?: string; // Thêm từ bảng Users
  status: 'active' | 'inactive'; // Trạng thái hiệu lực
}

export interface MedicalStaffTranslation {
  id: number;
  profile_id: number;
  specialization: string;
  language: 'vi' | 'en';
}

export interface MedicalStaffWithTranslations extends MedicalStaffProfile {
  translations: MedicalStaffTranslation[];
}

export interface Language {
  code: 'vi' | 'en';
  name: string;
  flag: string;
}