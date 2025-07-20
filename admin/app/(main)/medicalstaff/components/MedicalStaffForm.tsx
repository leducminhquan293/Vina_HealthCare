import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { classNames } from 'primereact/utils';
import { X, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MedicalStaffWithTranslations } from '../types/medical-staff';
import { specializationOptions } from '../data/mockData';
import type { User } from '../../user/types/user';

interface MedicalStaffFormProps {
  visible: boolean;
  onHide: () => void;
  staff?: MedicalStaffWithTranslations;
  onSave: (staff: MedicalStaffWithTranslations) => void;
}

export const MedicalStaffForm: React.FC<MedicalStaffFormProps> = ({
  visible,
  onHide,
  staff,
  onSave
}) => {
  const { translations, currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience_years: 0,
    license_number: '',
    profile_image: '',
    specialization: '',
    status: 'active' as 'active' | 'inactive'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    if (staff) {
      // Tìm user theo user_id
      const user = users.find(u => u.user_id === staff.user_id) || null;
      setSelectedUser(user);
      // ... giữ nguyên các trường bổ sung
      const currentTranslation = staff.translations.find(t => t.language === currentLanguage);
      setFormData({
        name: user?.full_name || '',
        email: user?.email || '',
        experience_years: staff.experience_years,
        license_number: staff.license_number,
        profile_image: staff.profile_image,
        specialization: currentTranslation?.specialization || '',
        status: (staff.status || 'active') as 'active' | 'inactive'
      });
    } else {
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        experience_years: 0,
        license_number: '',
        profile_image: '',
        specialization: '',
        status: 'active' as 'active' | 'inactive'
      });
    }
    setErrors({});
  }, [staff, currentLanguage, visible]);

  const handleUserChange = (e: { value: User }) => {
    setSelectedUser(e.value);
    setFormData({
      ...formData,
      name: e.value.full_name || '',
      email: e.value.email || ''
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedUser) {
      newErrors.user = translations.required;
    }

    if (formData.experience_years < 0) {
      newErrors.experience_years = translations.invalidNumber;
    }

    if (!formData.license_number.trim()) {
      newErrors.license_number = translations.required;
    }

    if (!formData.specialization) {
      newErrors.specialization = translations.required;
    }

    if (!formData.status) {
      newErrors.status = translations.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (!selectedUser) return; // Không cho submit nếu chưa chọn user

    const payload = {
      user_id: selectedUser._id, // Lấy _id từ user API
      name: selectedUser.full_name,
      email: selectedUser.email,
      experience_years: formData.experience_years,
      license_number: formData.license_number,
      profile_image: formData.profile_image,
      status: formData.status,
      translations: [
        {
          specialization: formData.specialization,
          language: currentLanguage
        }
      ]
    };

    fetch('http://localhost:3001/medical-staff-profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data);
        onHide();
      });
  };

  const title = staff ? translations.editStaffTitle : translations.addStaffTitle;

  return (
    <Dialog
      header={title}
      visible={visible}
      onHide={onHide}
      style={{ width: '600px' }}
      className="p-fluid"
    >
      <div className="p-grid p-formgrid">
        <div className="p-col-12 p-mb-3">
          <div className="p-d-flex p-jc-center p-mb-3">
            <Avatar
              image={formData.profile_image || undefined}
              icon="pi pi-user"
              size="xlarge"
              shape="circle"
            />
          </div>
          <label htmlFor="profile_image">{translations.profileImage}</label>
          <InputText
            id="profile_image"
            value={formData.profile_image}
            onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="p-col-12 p-mb-3">
          <label htmlFor="user">{currentLanguage === 'vi' ? 'Người dùng' : 'User'} *</label>
          <Dropdown
            id="user"
            value={selectedUser}
            options={users}
            optionLabel="full_name"
            onChange={handleUserChange}
            placeholder={currentLanguage === 'vi' ? 'Chọn người dùng...' : 'Select user...'}
            className={classNames({ 'p-invalid': errors.user })}
            filter
          />
          {errors.user && <small className="p-error">{errors.user}</small>}
        </div>
        <div className="p-col-12 p-mb-3">
          <label>{translations.name}</label>
          <InputText value={selectedUser?.full_name || ''} readOnly />
        </div>
        <div className="p-col-12 p-mb-3">
          <label>{translations.email}</label>
          <InputText value={selectedUser?.email || ''} readOnly />
        </div>

        <div className="p-col-6 p-mb-3">
          <label htmlFor="experience_years">{translations.experienceYears} *</label>
          <InputNumber
            id="experience_years"
            value={formData.experience_years}
            onValueChange={(e) => setFormData({ ...formData, experience_years: e.value || 0 })}
            min={0}
            max={50}
            className={classNames({ 'p-invalid': errors.experience_years })}
          />
          {errors.experience_years && <small className="p-error">{errors.experience_years}</small>}
        </div>

        <div className="p-col-6 p-mb-3">
          <label htmlFor="license_number">{translations.licenseNumber} *</label>
          <InputText
            id="license_number"
            value={formData.license_number}
            onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
            className={classNames({ 'p-invalid': errors.license_number })}
          />
          {errors.license_number && <small className="p-error">{errors.license_number}</small>}
        </div>

        <div className="p-col-12 p-mb-3">
          <label htmlFor="specialization">{translations.specialization} *</label>
          <Dropdown
            id="specialization"
            value={formData.specialization}
            options={specializationOptions[currentLanguage]}
            onChange={(e) => setFormData({ ...formData, specialization: e.value })}
            placeholder={`${translations.specialization}...`}
            className={classNames({ 'p-invalid': errors.specialization })}
          />
          {errors.specialization && <small className="p-error">{errors.specialization}</small>}
        </div>

        <div className="p-col-12 p-mb-3">
          <label htmlFor="status">{currentLanguage === 'vi' ? 'Trạng thái' : 'Status'} *</label>
          <Dropdown
            id="status"
            value={formData.status}
            options={[
              { label: currentLanguage === 'vi' ? 'Hiệu lực' : 'Active', value: 'active' },
              { label: currentLanguage === 'vi' ? 'Hết hiệu lực' : 'Inactive', value: 'inactive' }
            ]}
            onChange={(e) => setFormData({ ...formData, status: e.value })}
            placeholder={currentLanguage === 'vi' ? 'Chọn trạng thái...' : 'Select status...'}
            className={classNames({ 'p-invalid': errors.status })}
          />
          {errors.status && <small className="p-error">{errors.status}</small>}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
        <Button
          label={translations.cancel}
          icon={<X size={16} />}
          className="p-button-text"
          onClick={onHide}
        />
        <Button
          label={translations.save}
          icon={<Check size={16} />}
          onClick={handleSave}
        />
      </div>
    </Dialog>
  );
};