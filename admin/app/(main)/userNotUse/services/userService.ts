import { User } from '../types/user';

const API_BASE_URL = 'http://localhost:3001';

export interface CreateUserRequest {
    full_name: string;
    date_of_birth?: string;
    gender?: 'Male' | 'Female' | 'Other';
    phone?: string;
    email: string;
    address?: string;
    role: 'Patient' | 'Doctor' | 'Nurse';
}

export interface UpdateUserRequest {
    full_name?: string;
    date_of_birth?: string;
    gender?: 'Male' | 'Female' | 'Other';
    phone?: string;
    email?: string;
    address?: string;
    role?: 'Patient' | 'Doctor' | 'Nurse';
}

export interface ApiUser {
    _id: string;
    full_name: string;
    date_of_birth?: string;
    gender?: 'Male' | 'Female' | 'Other';
    phone?: string;
    email: string;
    address?: string;
    role: 'Patient' | 'Doctor' | 'Nurse';
    created_at: string;
}

// Transform API user to frontend user format
const transformApiUser = (apiUser: ApiUser): User => {
    return {
        user_id: parseInt(apiUser._id.slice(-6), 16), // Convert MongoDB _id to number
        _id: apiUser._id, // Keep MongoDB ID for API operations
        full_name: apiUser.full_name,
        date_of_birth: apiUser.date_of_birth,
        gender: apiUser.gender,
        phone: apiUser.phone,
        email: apiUser.email,
        address: apiUser.address,
        role: apiUser.role,
        created_at: apiUser.created_at
    };
};

// Transform frontend user to API format
const transformToApiUser = (user: CreateUserRequest | UpdateUserRequest) => {
    return user;
};

export class UserService {
    static async getAllUsers(): Promise<User[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const apiUsers: ApiUser[] = await response.json();
            return apiUsers.map(transformApiUser);
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async getUserById(id: string): Promise<User> {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const apiUser: ApiUser = await response.json();
            return transformApiUser(apiUser);
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    static async createUser(userData: CreateUserRequest): Promise<User> {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transformToApiUser(userData)),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const apiUser: ApiUser = await response.json();
            return transformApiUser(apiUser);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transformToApiUser(userData)),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const apiUser: ApiUser = await response.json();
            return transformApiUser(apiUser);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    static async deleteUser(id: string): Promise<void> {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    static async searchUsers(query: string): Promise<User[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/users?search=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const apiUsers: ApiUser[] = await response.json();
            return apiUsers.map(transformApiUser);
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    }

    static async getUsersByRole(role: string): Promise<User[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/users?role=${encodeURIComponent(role)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const apiUsers: ApiUser[] = await response.json();
            return apiUsers.map(transformApiUser);
        } catch (error) {
            console.error('Error fetching users by role:', error);
            throw error;
        }
    }

    static async getRoles(): Promise<{ roles: string[], description: Record<string, string> }> {
        try {
            const response = await fetch(`${API_BASE_URL}/users/roles`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw error;
        }
    }
} 