export interface User {
  user_id: number;
  _id?: string; // MongoDB ID for API operations
  full_name: string;
  date_of_birth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  phone?: string;
  email?: string;
  address?: string;
  role: 'Patient' | 'Doctor' | 'Nurse';
  created_at: string;
}

export interface UserFormData {
  full_name: string;
  date_of_birth: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  phone: string;
  email: string;
  address: string;
  role: 'Patient' | 'Doctor' | 'Nurse' | '';
}