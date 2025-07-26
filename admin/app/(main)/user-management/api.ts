import { User, CreateUserDto, UpdateUserDto } from './types';

const API_BASE_URL = 'http://localhost:3001';

// Lấy danh sách tất cả users
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Thêm user mới
export const addUser = async (userData: CreateUserDto): Promise<User> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to add user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

// Cập nhật user
export const editUser = async (userData: UpdateUserDto): Promise<User> => {
    try {
        // Loại bỏ user_id khỏi body data
        const { user_id, ...updateData } = userData;

        const response = await fetch(`${API_BASE_URL}/users/${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Xóa user
export const deleteUser = async (userId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}; 