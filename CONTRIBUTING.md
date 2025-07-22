# Hướng dẫn đóng góp vào dự án

Chào mừng bạn đến với dự án! Để đảm bảo việc phát triển diễn ra mượt mà và tránh xung đột code không cần thiết, vui lòng tuân theo các quy tắc sau:

---

## 🔀 Quy trình làm việc với Git

### 1. **Không commit trực tiếp vào `main` hoặc `develop`**
- Tất cả các thay đổi phải được thực hiện thông qua nhánh `feature/...`, `bugfix/...`, `hotfix/...`
- `main`: dùng để release production
- `develop`: dùng để tích hợp code từ các nhánh chức năng

---

### 2. **Tạo nhánh mới cho mỗi tính năng**

- Dùng cú pháp sau:
feature/tên-tính-năng
bugfix/tên-lỗi
hotfix/lỗi-nghiêm-trọng
- Ví dụ:
feature/user-login
bugfix/missing-header


> **Quy ước:** Tên nhánh chỉ dùng chữ thường, nối bằng dấu `-`

---

### 3. **Luôn cập nhật `develop` trước khi tạo Pull Request**

Trước khi tạo PR, bạn **phải merge hoặc rebase `develop` vào nhánh feature của mình** để:
- Nhận các thay đổi mới nhất
- Tự xử lý conflict nếu có
- Tránh conflict khi merge vào `develop`

```bash
# Từ nhánh develop
git checkout develop
git pull origin develop

# Về lại nhánh feature của bạn
git checkout feature/your-feature
git merge develop
# hoặc
git rebase develop