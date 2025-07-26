import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { UserModalProps, UserFormData } from './types';
import { addUser, editUser } from './api';
import { Toast } from 'primereact/toast';

const UserModal: React.FC<UserModalProps> = ({
    visible,
    onHide,
    user,
    mode,
    onSuccess
}) => {
    const [formData, setFormData] = useState<UserFormData>({
        full_name: '',
        date_of_birth: null,
        gender: undefined,
        phone: '',
        email: '',
        address: '',
        avatar: '',
        type: 'normal',
        role: 'Patient'
    });
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);

    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' }
    ];

    const typeOptions = [
        { label: 'Normal', value: 'normal' },
        { label: 'VIP', value: 'vip' }
    ];

    const roleOptions = [
        { label: 'Bệnh nhân', value: 'Patient' },
        { label: 'Bác sĩ', value: 'Doctor' },
        { label: 'Y tá', value: 'Nurse' }
    ];

    useEffect(() => {
        console.log('useEffect triggered - visible:', visible, 'mode:', mode, 'user:', user);

        if (visible && user && mode === 'edit') {
            console.log('Setting form data for edit mode with user:', user);
            setFormData({
                full_name: user.full_name || '',
                date_of_birth: user.date_of_birth ? new Date(user.date_of_birth) : null,
                gender: user.gender,
                phone: user.phone || '',
                email: user.email || '',
                address: user.address || '',
                avatar: user.avatar || '',
                type: user.type || 'normal',
                role: user.role || 'Patient'
            });
        } else if (visible && mode === 'add') {
            console.log('Setting form data for add mode');
            setFormData({
                full_name: '',
                date_of_birth: null,
                gender: undefined,
                phone: '',
                email: '',
                address: '',
                avatar: '',
                type: 'normal',
                role: 'Patient'
            });
        }
    }, [visible, user, mode]);

    // Function kiểm tra form có hợp lệ không
    const isFormValid = () => {
        const hasValidName = formData.full_name.trim().length > 0;
        const hasValidEmail = formData.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
        const hasValidPhone = !formData.phone || /^[0-9+\-\s()]+$/.test(formData.phone.trim());
        const hasValidAvatar = formData.avatar && formData.avatar.trim().length > 0;
        const hasValidRole = !!formData.role;

        return hasValidName && hasValidEmail && hasValidPhone && hasValidAvatar && hasValidRole;
    };

    const handleSubmit = async () => {
        // Debug: Log thông tin user và mode
        console.log('Mode:', mode);
        console.log('User data:', user);
        console.log('User ID:', user?.user_id);

        // Validation cho các trường bắt buộc
        if (!formData.full_name.trim()) {
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Tên đầy đủ là bắt buộc',
                life: 3000
            });
            return;
        }

        if (!formData.email?.trim()) {
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Email là bắt buộc',
                life: 3000
            });
            return;
        }

        if (!formData.avatar) {
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Ảnh đại diện là bắt buộc',
                life: 3000
            });
            return;
        }

        // Validation email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Email không đúng định dạng',
                life: 3000
            });
            return;
        }

        // Validation cho phone (nếu có nhập)
        if (formData.phone && formData.phone.trim()) {
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(formData.phone.trim())) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Số điện thoại không đúng định dạng',
                    life: 3000
                });
                return;
            }
        }

        // Kiểm tra user_id khi mode là edit
        if (mode === 'edit') {
            if (!user) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Không tìm thấy thông tin người dùng để cập nhật',
                    life: 3000
                });
                return;
            }

            if (!user.user_id || user.user_id <= 0) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'ID người dùng không hợp lệ',
                    life: 3000
                });
                return;
            }
        }

        setLoading(true);
        try {
            const submitData = {
                ...formData,
                full_name: formData.full_name.trim(),
                email: formData.email.trim(),
                phone: formData.phone?.trim() || undefined,
                address: formData.address?.trim() || undefined,
                date_of_birth: formData.date_of_birth ? formData.date_of_birth.toISOString().split('T')[0] : undefined
            };

            if (mode === 'add') {
                await addUser(submitData);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Thêm người dùng thành công',
                    life: 3000
                });
            } else {
                const updateData = { ...submitData, user_id: user!.user_id };
                console.log('Update data being sent:', updateData);
                await editUser(updateData);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Cập nhật người dùng thành công',
                    life: 3000
                });
            }

            onSuccess();
            onHide();
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Có lỗi xảy ra. Vui lòng thử lại.',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (event: any) => {
        const file = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    avatar: e.target?.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {
        // Trigger file input click
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFormData(prev => ({
                        ...prev,
                        avatar: e.target?.result as string
                    }));
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button
                label="Đóng"
                icon="pi pi-times"
                onClick={onHide}
                className="p-button-text"
            />
            <Button
                label="Lưu"
                icon="pi pi-check"
                onClick={handleSubmit}
                loading={loading}
                disabled={!isFormValid()}
                autoFocus
                tooltip={!isFormValid() ? "Vui lòng điền đầy đủ thông tin bắt buộc" : ""}
                tooltipOptions={{ position: 'top' }}
            />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                visible={visible}
                onHide={onHide}
                header={mode === 'add' ? 'Thêm người dùng mới' : 'Cập nhật người dùng'}
                footer={renderFooter}
                style={{ width: '50vw' }}
                modal
                className="p-fluid"
            >
                <div className="flex flex-column gap-3">
                    {/* Full Name - Required */}
                    <div className="flex flex-column">
                        <label htmlFor="full_name" className="mb-2">
                            Tên đầy đủ <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            id="full_name"
                            value={formData.full_name}
                            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                            placeholder="Nhập tên đầy đủ"
                            className={!formData.full_name.trim() ? 'p-invalid' : ''}
                        />
                        {!formData.full_name.trim() && (
                            <small className="text-red-500">Tên đầy đủ là bắt buộc</small>
                        )}
                    </div>

                    {/* Email - Required */}
                    <div className="flex flex-column">
                        <label htmlFor="email" className="mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Nhập email"
                            className={!formData.email?.trim() ? 'p-invalid' : ''}
                        />
                        {!formData.email?.trim() && (
                            <small className="text-red-500">Email là bắt buộc</small>
                        )}
                        {formData.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) && (
                            <small className="text-red-500">Email không đúng định dạng</small>
                        )}
                    </div>

                    {/* Phone - Recommended */}
                    <div className="flex flex-column">
                        <label htmlFor="phone" className="mb-2">
                            Số điện thoại <span className="text-blue-500">(khuyến khích)</span>
                        </label>
                        <InputText
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Nhập số điện thoại"
                        />
                        {formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone.trim()) && (
                            <small className="text-red-500">Số điện thoại không đúng định dạng</small>
                        )}
                    </div>

                    {/* Gender - Recommended */}
                    <div className="flex flex-column">
                        <label htmlFor="gender" className="mb-2">
                            Giới tính <span className="text-blue-500">(khuyến khích)</span>
                        </label>
                        <Dropdown
                            id="gender"
                            value={formData.gender}
                            options={genderOptions}
                            onChange={(e) => setFormData(prev => ({ ...prev, gender: e.value }))}
                            placeholder="Chọn giới tính"
                        />
                    </div>

                    {/* Date of Birth - Optional */}
                    <div className="flex flex-column">
                        <label htmlFor="date_of_birth" className="mb-2">
                            Ngày sinh
                        </label>
                        <Calendar
                            id="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.value }))}
                            showIcon
                            dateFormat="dd/mm/yy"
                            placeholder="Chọn ngày sinh"
                        />
                    </div>

                    {/* Address - Optional */}
                    <div className="flex flex-column">
                        <label htmlFor="address" className="mb-2">
                            Địa chỉ
                        </label>
                        <InputText
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            placeholder="Nhập địa chỉ"
                        />
                    </div>

                    {/* Type - Optional */}
                    <div className="flex flex-column">
                        <label htmlFor="type" className="mb-2">
                            Loại người dùng
                        </label>
                        <Dropdown
                            id="type"
                            value={formData.type}
                            options={typeOptions}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.value }))}
                            placeholder="Chọn loại người dùng"
                        />
                    </div>

                    {/* Role - Required */}
                    <div className="flex flex-column">
                        <label htmlFor="role" className="mb-2">
                            Vai trò <span className="text-red-500">*</span>
                        </label>
                        <Dropdown
                            id="role"
                            value={formData.role}
                            options={roleOptions}
                            onChange={(e) => setFormData(prev => ({ ...prev, role: e.value }))}
                            placeholder="Chọn vai trò"
                            className={!formData.role ? 'p-invalid' : ''}
                        />
                        {!formData.role && (
                            <small className="text-red-500">Vai trò là bắt buộc</small>
                        )}
                    </div>

                    {/* Avatar Upload - Required */}
                    <div className="flex flex-column">
                        <label htmlFor="avatar" className="mb-2">
                            Ảnh đại diện <span className="text-red-500">*</span>
                        </label>
                        <div className="flex align-items-center gap-3">
                            <Button
                                label="Chọn ảnh"
                                icon="pi pi-image"
                                onClick={handleAvatarClick}
                                className="p-button-outlined"
                                style={{
                                    fontSize: '0.75rem',
                                    padding: '0.375rem 1.25rem',
                                    height: '35px',
                                    minWidth: '110px',
                                    width: 'auto',
                                }}
                            />
                            {formData.avatar && (
                                <div className="flex align-items-center gap-2">
                                    <img
                                        src={formData.avatar}
                                        alt="Avatar preview"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '2px solid #e0e0e0'
                                        }}
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        severity="danger"
                                        outlined
                                        size="small"
                                        onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
                                        tooltip="Xóa ảnh"
                                        tooltipOptions={{ position: 'top' }}
                                    />
                                </div>
                            )}
                        </div>
                        {!formData.avatar && (
                            <small className="text-red-500">
                                Ảnh đại diện là bắt buộc
                            </small>
                        )}
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default UserModal; 