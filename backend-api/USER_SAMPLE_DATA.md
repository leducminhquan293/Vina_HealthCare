# Dữ liệu mẫu để test API Create User

## Endpoint
```
POST http://localhost:3001/users
Content-Type: application/json
```

## 1. Tạo Bệnh nhân (Patient)

### Bệnh nhân cơ bản
```json
{
  "full_name": "Nguyễn Văn An",
  "email": "nguyenvana@example.com",
  "role": "Patient",
  "phone": "0123456789",
  "gender": "Male",
  "date_of_birth": "1990-05-15",
  "address": "123 Đường ABC, Quận 1, TP.HCM"
}
```

### Bệnh nhân nữ
```json
{
  "full_name": "Trần Thị Bình",
  "email": "tranthibinh@example.com",
  "role": "Patient",
  "phone": "0987654321",
  "gender": "Female",
  "date_of_birth": "1985-12-20",
  "address": "456 Đường XYZ, Quận 3, TP.HCM"
}
```

### Bệnh nhân tối thiểu (chỉ required fields)
```json
{
  "full_name": "Lê Văn Cường",
  "email": "levancuong@example.com",
  "role": "Patient"
}
```

## 2. Tạo Bác sĩ (Doctor)

### Bác sĩ đầy đủ thông tin
```json
{
  "full_name": "Bác sĩ Phạm Văn Dũng",
  "email": "bs.phamvandung@example.com",
  "role": "Doctor",
  "phone": "0901234567",
  "gender": "Male",
  "date_of_birth": "1980-08-10",
  "address": "789 Đường DEF, Quận 5, TP.HCM"
}
```

### Bác sĩ nữ
```json
{
  "full_name": "Bác sĩ Nguyễn Thị Em",
  "email": "bs.nguyenthiem@example.com",
  "role": "Doctor",
  "phone": "0912345678",
  "gender": "Female",
  "date_of_birth": "1982-03-25",
  "address": "321 Đường GHI, Quận 7, TP.HCM"
}
```

## 3. Tạo Y tá (Nurse)

### Y tá đầy đủ thông tin
```json
{
  "full_name": "Y tá Trần Văn Phúc",
  "email": "yt.tranvanphuc@example.com",
  "role": "Nurse",
  "phone": "0923456789",
  "gender": "Male",
  "date_of_birth": "1988-11-30",
  "address": "654 Đường JKL, Quận 10, TP.HCM"
}
```

### Y tá nữ
```json
{
  "full_name": "Y tá Lê Thị Gia",
  "email": "yt.lethigia@example.com",
  "role": "Nurse",
  "phone": "0934567890",
  "gender": "Female",
  "date_of_birth": "1992-07-05",
  "address": "987 Đường MNO, Quận 2, TP.HCM"
}
```

## 4. Test với curl

### Tạo bệnh nhân
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Nguyễn Văn An",
    "email": "nguyenvana@example.com",
    "role": "Patient",
    "phone": "0123456789",
    "gender": "Male",
    "date_of_birth": "1990-05-15",
    "address": "123 Đường ABC, Quận 1, TP.HCM"
  }'
```

### Tạo bác sĩ
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Bác sĩ Phạm Văn Dũng",
    "email": "bs.phamvandung@example.com",
    "role": "Doctor",
    "phone": "0901234567",
    "gender": "Male",
    "date_of_birth": "1980-08-10",
    "address": "789 Đường DEF, Quận 5, TP.HCM"
  }'
```

### Tạo y tá
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Y tá Trần Văn Phúc",
    "email": "yt.tranvanphuc@example.com",
    "role": "Nurse",
    "phone": "0923456789",
    "gender": "Male",
    "date_of_birth": "1988-11-30",
    "address": "654 Đường JKL, Quận 10, TP.HCM"
  }'
```

## 5. Test với Postman

### Headers
```
Content-Type: application/json
```

### Body (raw JSON)
```json
{
  "full_name": "Nguyễn Văn An",
  "email": "nguyenvana@example.com",
  "role": "Patient",
  "phone": "0123456789",
  "gender": "Male",
  "date_of_birth": "1990-05-15",
  "address": "123 Đường ABC, Quận 1, TP.HCM"
}
```

## 6. Validation Rules

### Required Fields
- `full_name`: string, max 100 characters
- `email`: string, max 100 characters, unique
- `role`: enum ("Patient", "Doctor", "Nurse")

### Optional Fields
- `date_of_birth`: string (date format: YYYY-MM-DD)
- `gender`: enum ("Male", "Female", "Other")
- `phone`: string, max 20 characters
- `address`: string, max 255 characters

### Gender Values
- "Male"
- "Female" 
- "Other"

### Role Values
- "Patient" (Bệnh nhân)
- "Doctor" (Bác sĩ)
- "Nurse" (Y tá)

## 7. Response Example

### Success Response (201 Created)
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "full_name": "Nguyễn Văn An",
  "email": "nguyenvana@example.com",
  "role": "Patient",
  "phone": "0123456789",
  "gender": "Male",
  "date_of_birth": "1990-05-15T00:00:00.000Z",
  "address": "123 Đường ABC, Quận 1, TP.HCM",
  "created_at": "2023-09-06T10:30:00.000Z"
}
```

### Error Response (400 Bad Request)
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### Error Response (409 Conflict - Email exists)
```json
{
  "statusCode": 409,
  "message": "Email đã tồn tại",
  "error": "Conflict"
}
``` 