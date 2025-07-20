import { User } from '../types/user';

export const mockUsers: User[] = [
  {
    user_id: 1,
    full_name: 'Nguyễn Văn An',
    date_of_birth: '1985-03-15',
    gender: 'Male',
    phone: '0901234567',
    email: 'nguyen.an@email.com',
    address: '123 Lê Lợi, Quận 1, TP.HCM',
    role: 'Doctor',
    created_at: '2024-01-15T08:30:00Z'
  },
  {
    user_id: 2,
    full_name: 'Trần Thị Bình',
    date_of_birth: '1990-07-22',
    gender: 'Female',
    phone: '0912345678',
    email: 'tran.binh@email.com',
    address: '456 Nguyễn Huệ, Quận 1, TP.HCM',
    role: 'Nurse',
    created_at: '2024-01-20T10:15:00Z'
  },
  {
    user_id: 3,
    full_name: 'Lê Hoàng Cường',
    date_of_birth: '1978-12-10',
    gender: 'Male',
    phone: '0923456789',
    email: 'le.cuong@email.com',
    address: '789 Điện Biên Phủ, Quận 3, TP.HCM',
    role: 'Patient',
    created_at: '2024-02-01T14:45:00Z'
  },
  {
    user_id: 4,
    full_name: 'Phạm Thị Dung',
    date_of_birth: '1992-05-18',
    gender: 'Female',
    phone: '0934567890',
    email: 'pham.dung@email.com',
    address: '321 Cách Mạng Tháng 8, Quận 10, TP.HCM',
    role: 'Doctor',
    created_at: '2024-02-10T09:20:00Z'
  },
  {
    user_id: 5,
    full_name: 'Hoàng Văn Em',
    date_of_birth: '1988-11-30',
    gender: 'Male',
    phone: '0945678901',
    email: 'hoang.em@email.com',
    address: '654 Võ Văn Tần, Quận 3, TP.HCM',
    role: 'Patient',
    created_at: '2024-02-15T16:30:00Z'
  },
  {
    user_id: 6,
    full_name: 'Vũ Thị Phương',
    date_of_birth: '1995-09-08',
    gender: 'Female',
    phone: '0956789012',
    email: 'vu.phuong@email.com',
    address: '987 Lý Tự Trọng, Quận 1, TP.HCM',
    role: 'Nurse',
    created_at: '2024-03-01T11:45:00Z'
  }
];

export const genderOptions = [
  { label: 'Nam', value: 'Male' },
  { label: 'Nữ', value: 'Female' },
  { label: 'Khác', value: 'Other' }
];

export const roleOptions = [
  { label: 'Bệnh nhân', value: 'Patient' },
  { label: 'Bác sĩ', value: 'Doctor' },
  { label: 'Điều dưỡng', value: 'Nurse' }
];