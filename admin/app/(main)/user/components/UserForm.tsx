import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { User, X, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { User as UserType, UserFormData } from '../types/user';

interface UserFormProps {
  visible: boolean;
  onHide: () => void;
  user?: UserType;
  onSave: (user: UserType) => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  visible,
  onHide,
  user,
  onSave
}) => {
  const { translations, currentLanguage } = useLanguage();
  const [formData, setFormData] = useState<UserFormData>({
    full_name: '',
    date_of_birth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    role: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const genderOptions = [
    { label: translations.male, value: 'Male' },
    { label: translations.female, value: 'Female' },
    { label: translations.other, value: 'Other' }
  ];

  const roleOptions = [
    { label: translations.patient, value: 'Patient' },
    { label: translations.doctor, value: 'Doctor' },
    { label: translations.nurse, value: 'Nurse' }
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name,
        date_of_birth: user.date_of_birth || '',
        gender: user.gender || '',
        phone: user.phone || '',
        email: user.email || '',
        address: user.address || '',
        role: user.role
      });
    } else {
      setFormData({
        full_name: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        role: ''
      });
    }
    setErrors({});
  }, [user, visible]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = translations.required;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations.invalidEmail;
    }

    if (formData.phone && !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = translations.invalidPhone;
    }

    if (!formData.role) {
      newErrors.role = translations.selectRole;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const newUser: UserType = {
      user_id: user?.user_id || Date.now(),
      _id: user?._id, // Preserve MongoDB ID for updates
      full_name: formData.full_name,
      date_of_birth: formData.date_of_birth || undefined,
      gender: formData.gender || undefined,
      phone: formData.phone || undefined,
      email: formData.email || undefined,
      address: formData.address || undefined,
      role: formData.role as 'Patient' | 'Doctor' | 'Nurse',
      created_at: user?.created_at || new Date().toISOString()
    };

    onSave(newUser);
    onHide();
  };

  const handleDateChange = (e: any) => {
    if (e.value) {
      const date = new Date(e.value);
      setFormData({ ...formData, date_of_birth: date.toISOString().split('T')[0] });
    } else {
      setFormData({ ...formData, date_of_birth: '' });
    }
  };

  const title = user ? translations.editUserTitle : translations.addUserTitle;

  return (
    <Dialog
      header={title}
      visible={visible}
      onHide={onHide}
      style={{ width: '700px', maxWidth: '90vw' }}
      className="p-fluid"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>

        {/* Full Name - Full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="full_name" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
            {translations.fullName} *
          </label>
          <InputText
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className={classNames({ 'p-invalid': errors.full_name })}
            placeholder={`${translations.fullName}...`}
          />
          {errors.full_name && <small className="p-error">{errors.full_name}</small>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
            {translations.email}
          </label>
          <InputText
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={classNames({ 'p-invalid': errors.email })}
            placeholder="email@example.com"
          />
          {errors.email && <small className="p-error">{errors.email}</small>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
            {translations.phone}
          </label>
          <InputText
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={classNames({ 'p-invalid': errors.phone })}
            placeholder="0901234567"
          />
          {errors.phone && <small className="p-error">{errors.phone}</small>}
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="date_of_birth" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
            {translations.dateOfBirth}
          </label>
          <Calendar
            id="date_of_birth"
            value={formData.date_of_birth ? new Date(formData.date_of_birth) : null}
            onChange={handleDateChange}
            dateFormat="dd/mm/yy"
            placeholder="dd/mm/yyyy"
            showIcon
            maxDate={new Date()}
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
            {translations.gender}
          </label>
          <Dropdown
            id="gender"
            value={formData.gender}
            options={genderOptions}
            onChange={(e) => setFormData({ ...formData, gender: e.value })}
            placeholder={`${translations.gender}...`}
            className={classNames({ 'p-invalid': errors.gender })}
          />
          {errors.gender && <small className="p-error">{errors.gender}</small>}
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
            {translations.role} *
          </label>
          <Dropdown
            id="role"
            value={formData.role}
            options={roleOptions}
            onChange={(e) => setFormData({ ...formData, role: e.value })}
            placeholder={`${translations.role}...`}
            className={classNames({ 'p-invalid': errors.role })}
          />
          {errors.role && <small className="p-error">{errors.role}</small>}
        </div>

        {/* Address - Full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="address" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>
            {translations.address}
          </label>
          <InputTextarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
            placeholder={`${translations.address}...`}
          />
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.75rem',
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e2e8f0'
      }}>
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