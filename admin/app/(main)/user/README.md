# User Management Module - API Integration

## Overview
Module quản lý người dùng đã được tích hợp với API backend để thực hiện các thao tác CRUD thực tế thay vì sử dụng dữ liệu tĩnh.

## API Integration

### Backend API Endpoints
- **Base URL**: `http://localhost:3001`
- **Users API**: `/users`

### Available Operations
1. **GET /users** - Lấy danh sách tất cả users
2. **GET /users?role={role}** - Lọc users theo role
3. **GET /users?search={query}** - Tìm kiếm users
4. **GET /users/{id}** - Lấy thông tin user theo ID
5. **POST /users** - Tạo user mới
6. **PUT /users/{id}** - Cập nhật user
7. **DELETE /users/{id}** - Xóa user
8. **GET /users/roles** - Lấy danh sách roles

## Components

### UserService (`services/userService.ts`)
Service class để giao tiếp với API backend:
- `getAllUsers()` - Lấy tất cả users
- `createUser(data)` - Tạo user mới
- `updateUser(id, data)` - Cập nhật user
- `deleteUser(id)` - Xóa user
- `searchUsers(query)` - Tìm kiếm users
- `getUsersByRole(role)` - Lọc theo role

### UserTable (`components/UserTable.tsx`)
Component hiển thị danh sách users với các tính năng:
- Hiển thị danh sách users từ API
- Tìm kiếm và lọc
- Thêm, sửa, xóa users
- Loading states
- Error handling

### UserForm (`components/UserForm.tsx`)
Form để thêm/sửa user với validation:
- Validation đầy đủ
- Tích hợp với API
- Error handling

## Data Transformation

### API User Format (Backend)
```typescript
interface ApiUser {
  _id: string;           // MongoDB ID
  full_name: string;
  date_of_birth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  phone?: string;
  email: string;
  address?: string;
  role: 'Patient' | 'Doctor' | 'Nurse';
  created_at: string;
}
```

### Frontend User Format
```typescript
interface User {
  user_id: number;       // Converted from MongoDB _id
  _id?: string;          // Original MongoDB ID for API calls
  full_name: string;
  date_of_birth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  phone?: string;
  email?: string;
  address?: string;
  role: 'Patient' | 'Doctor' | 'Nurse';
  created_at: string;
}
```

## Setup Instructions

### 1. Start Backend API
```bash
cd backend-api
yarn install
yarn run start:dev
```

### 2. Start Frontend Admin
```bash
cd admin
yarn install
yarn dev
```

### 3. Verify Connection
- Backend API should be running on `http://localhost:3001`
- Frontend Admin should be running on `http://localhost:3000`
- Check browser console for any CORS or connection errors

## Features

### ✅ Implemented
- [x] Load users from API
- [x] Create new user
- [x] Update existing user
- [x] Delete user
- [x] Search users
- [x] Filter by role
- [x] Loading states
- [x] Error handling
- [x] Toast notifications
- [x] Form validation

### 🔄 Real-time Updates
- Users list automatically refreshes after CRUD operations
- Loading indicators during API calls
- Error messages for failed operations

## Error Handling

### Common Errors
1. **Network Error**: Check if backend API is running
2. **CORS Error**: Ensure backend allows frontend origin
3. **Validation Error**: Check form data format
4. **Duplicate Email**: Email must be unique

### Error Messages
- Loading errors: "Error loading users"
- Save errors: "Error saving user"
- Delete errors: "Error deleting user"
- Network errors: "Network error occurred"

## Testing

### Manual Testing
1. **Load Users**: Verify users load from API
2. **Add User**: Create new user and verify it appears in list
3. **Edit User**: Modify user details and verify changes
4. **Delete User**: Remove user and verify it's removed from list
5. **Search**: Test search functionality
6. **Filter**: Test role filtering

### API Testing
Use the provided sample data in `backend-api/USER_SAMPLE_DATA.md` to test API endpoints directly.

## Troubleshooting

### Backend Not Running
```
Error: fetch failed
```
**Solution**: Start backend API server

### CORS Issues
```
Access to fetch at 'http://localhost:3001/users' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solution**: Ensure backend has CORS configured properly

### Data Not Loading
```
Error loading users
```
**Solution**: Check browser network tab for specific error details

## Future Enhancements

### Potential Improvements
- [ ] Pagination for large datasets
- [ ] Bulk operations (delete multiple users)
- [ ] Export users to CSV/Excel
- [ ] User activity logging
- [ ] Advanced filtering options
- [ ] User image upload
- [ ] Password management (if auth is added) 