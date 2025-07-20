import { MedicalStaffWithTranslations } from '../types/medical-staff';

const API_BASE_URL = 'http://localhost:3001';

export interface CreateMedicalStaffProfileRequest {
    user_id: number;
    name: string;
    email: string;
    status: 'active' | 'inactive';
    experience_years?: number;
    license_number?: string;
    profile_image?: string;
    translations?: {
        specialization: string;
        language: string;
    }[];
}

export interface UpdateMedicalStaffProfileRequest extends Partial<CreateMedicalStaffProfileRequest> { }

export class MedicalStaffService {
    static async getAllProfiles(): Promise<MedicalStaffWithTranslations[]> {
        const res = await fetch(`${API_BASE_URL}/medical-staff-profiles`);
        if (!res.ok) throw new Error('Failed to fetch profiles');
        return await res.json();
    }

    static async getProfileById(id: string): Promise<MedicalStaffWithTranslations> {
        const res = await fetch(`${API_BASE_URL}/medical-staff-profiles/${id}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        return await res.json();
    }

    static async createProfile(data: CreateMedicalStaffProfileRequest): Promise<MedicalStaffWithTranslations> {
        const res = await fetch(`${API_BASE_URL}/medical-staff-profiles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to create profile');
        return await res.json();
    }

    static async updateProfile(id: string, data: UpdateMedicalStaffProfileRequest): Promise<MedicalStaffWithTranslations> {
        const res = await fetch(`${API_BASE_URL}/medical-staff-profiles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to update profile');
        return await res.json();
    }

    static async deleteProfile(id: string): Promise<void> {
        const res = await fetch(`${API_BASE_URL}/medical-staff-profiles/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete profile');
    }
}