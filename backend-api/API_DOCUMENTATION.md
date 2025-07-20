# API Documentation - Vina Healthcare Backend

## Base URL
```
http://localhost:3001
```

## Authentication Endpoints

### 1. Auth Controller (`/auth`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/auth/signup` | Đăng ký tài khoản mới | `SignUpDto` | `{ access_token: string }` |
| POST | `/auth/signin` | Đăng nhập | `SignInDto` | `{ access_token: string }` |

**SignUpDto:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "age": "number",
  "roles": ["admin" | "staff" | "user"]
}
```

**SignInDto:**
```json
{
  "email": "string",
  "password": "string"
}
```

## User Management Endpoints

### 2. Users Controller (`/users`)

| Method | Endpoint | Description | Query Parameters | Request Body | Response |
|--------|----------|-------------|------------------|--------------|----------|
| POST | `/users` | Tạo user mới | - | `CreateUserDto` | `User` |
| GET | `/users` | Lấy danh sách users | `role`, `search` | - | `User[]` |
| GET | `/users/count` | Đếm số lượng users theo role | `role` | - | `{ count: number }` |
| GET | `/users/roles` | Lấy danh sách roles có sẵn | - | - | `{ roles: string[], description: object }` |
| GET | `/users/:id` | Lấy thông tin user theo ID | - | - | `User` |
| PUT | `/users/:id` | Cập nhật thông tin user | - | `UpdateUserDto` | `User` |
| DELETE | `/users/:id` | Xóa user | - | - | `{ message: string }` |

**CreateUserDto:**
```json
{
  "full_name": "string (required, max 100 chars)",
  "date_of_birth": "string (date format, optional)",
  "gender": "Male | Female | Other (optional)",
  "phone": "string (max 20 chars, optional)",
  "email": "string (required, max 100 chars, unique)",
  "address": "string (max 255 chars, optional)",
  "role": "Patient | Doctor | Nurse (required)"
}
```

**UpdateUserDto:** Tương tự CreateUserDto nhưng tất cả fields đều optional

## Service Management Endpoints

### 3. Services Controller (`/services`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/services` | Tạo service mới | `any` | `Service` |
| GET | `/services` | Lấy danh sách tất cả services | - | `Service[]` |

### 4. DM Services Controller (`/dm-services`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/dm-services` | Tạo DM service mới | `CreateDMServiceDTO` | `DMService` |
| GET | `/dm-services` | Lấy danh sách tất cả DM services | - | `DMService[]` |
| GET | `/dm-services/category/:category` | Lấy DM services theo category | - | `DMService[]` |
| GET | `/dm-services/:id` | Lấy DM service theo ID | - | `DMService` |
| PUT | `/dm-services/:id` | Cập nhật DM service | `CreateDMServiceDTO` | `DMService` |
| DELETE | `/dm-services/:id` | Xóa DM service | - | `DMService` |

### 5. DM Feature Services Controller (`/dm-feature-services`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/dm-feature-services` | Tạo DM feature service mới | `CreateDMFeatureServiceDTO` | `DMFeatureService` |
| GET | `/dm-feature-services` | Lấy danh sách tất cả DM feature services | - | `DMFeatureService[]` |
| GET | `/dm-feature-services/category/:category` | Lấy DM feature services theo category | - | `DMFeatureService[]` |
| GET | `/dm-feature-services/:id` | Lấy DM feature service theo ID | - | `DMFeatureService` |
| PUT | `/dm-feature-services/:id` | Cập nhật DM feature service | `CreateDMFeatureServiceDTO` | `DMFeatureService` |
| DELETE | `/dm-feature-services/:id` | Xóa DM feature service | - | `DMFeatureService` |

### 6. DM Price Services Controller (`/dm-price-services`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/dm-price-services` | Tạo DM price service mới | `CreateDMPriceServiceDTO` | `DMPriceService` |
| GET | `/dm-price-services` | Lấy danh sách tất cả DM price services | - | `DMPriceService[]` |
| GET | `/dm-price-services/category/:category` | Lấy DM price services theo category | - | `DMPriceService[]` |
| GET | `/dm-price-services/:id` | Lấy DM price service theo ID | - | `DMPriceService` |
| PUT | `/dm-price-services/:id` | Cập nhật DM price service | `CreateDMPriceServiceDTO` | `DMPriceService` |
| DELETE | `/dm-price-services/:id` | Xóa DM price service | - | `DMPriceService` |

## General Endpoints

### 7. App Controller (`/`)

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/` | Health check endpoint | `"Hello World!"` |
| GET | `/api-routes` | Danh sách tất cả API routes | `JSON` |

## Authentication & Authorization

### JWT Token
- **Secret Key**: `your-secret-key`
- **Expiration**: 24 hours
- **Format**: Bearer token in Authorization header

### Role-based Access Control
- **PATIENT**: Bệnh nhân
- **DOCTOR**: Bác sĩ
- **NURSE**: Y tá

### Headers Required (cho Auth endpoints)
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

## Error Handling

Ứng dụng có hệ thống xử lý lỗi toàn cục với các mã lỗi HTTP tiêu chuẩn:

- **400**: Bad Request - Yêu cầu không hợp lệ
- **401**: Unauthorized - Token không hợp lệ
- **403**: Forbidden - Không có quyền truy cập
- **404**: Not Found - Dữ liệu không được tìm thấy
- **409**: Conflict - Xung đột dữ liệu
- **422**: Unprocessable Entity - Dữ liệu không thể xử lý
- **500**: Internal Server Error - Lỗi máy chủ nội bộ

## Database

- **MongoDB**: `mongodb://localhost:27017/Vina`
- **Collections**: users, services, dm-services, dm-feature-services, dm-price-services

## Testing API

### 1. Test Health Check
```bash
curl http://localhost:3001/
```

### 2. Test API Routes
```bash
curl http://localhost:3001/api-routes
```

### 3. Test Users
```bash
# Get all users
curl -X GET http://localhost:3001/users

# Get users by role
curl -X GET "http://localhost:3001/users?role=Doctor"

# Search users
curl -X GET "http://localhost:3001/users?search=john"

# Get available roles
curl -X GET http://localhost:3001/users/roles

# Create a new user
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "role": "Patient",
    "phone": "0123456789",
    "gender": "Male"
  }'
```

### 4. Test Services
```bash
# Get all services
curl -X GET http://localhost:3001/services

# Create a new service
curl -X POST http://localhost:3001/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Service",
    "description": "Test service description"
  }'
```

## Development Commands

```bash
# Install dependencies
yarn install

# Run in development mode
yarn run start:dev

# Run in production mode
yarn run start:prod

# Run tests
yarn run test

# Build application
yarn run build
``` 