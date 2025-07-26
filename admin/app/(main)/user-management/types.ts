export interface User {
    user_id: number;
    full_name: string;
    date_of_birth?: string;
    gender?: 'Male' | 'Female' | 'Other';
    phone?: string;
    email?: string;
    address?: string;
    avatar: string;
    type?: 'normal' | 'vip';
    created_at: string;
    role: 'Patient' | 'Doctor' | 'Nurse';
}

export interface CreateUserDto {
    full_name: string;
    date_of_birth?: string;
    gender?: 'Male' | 'Female' | 'Other';
    phone?: string;
    email?: string;
    address?: string;
    avatar: string;
    type?: 'normal' | 'vip';
    role: 'Patient' | 'Doctor' | 'Nurse';
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
    user_id: number;
    role?: 'Patient' | 'Doctor' | 'Nurse';
}

export interface UserModalProps {
    visible: boolean;
    onHide: () => void;
    user?: User;
    mode: 'add' | 'edit';
    onSuccess: () => void;
}

export interface ConfirmDeleteDialogProps {
    visible: boolean;
    onHide: () => void;
    onConfirm: () => void;
    userName: string;
}

export interface UserFormData {
    full_name: string;
    date_of_birth?: Date | null;
    gender?: 'Male' | 'Female' | 'Other';
    phone?: string;
    email?: string;
    address?: string;
    avatar: string;
    type?: 'normal' | 'vip';
    role: 'Patient' | 'Doctor' | 'Nurse';
} 