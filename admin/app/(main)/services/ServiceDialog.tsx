import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Service } from './types';

interface ServiceDialogProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: Partial<Service>) => void;
  service?: Service | null;
  loading?: boolean;
}

const initialState = {
  icon_name: '',
  is_active: true,
  name: '',
  description: '',
  name_en: '',
  description_en: '',
};

const ServiceDialog: React.FC<ServiceDialogProps> = ({ visible, onHide, onSubmit, service, loading }) => {
  const [form, setForm] = useState<Partial<Service>>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (service) setForm(service);
    else setForm(initialState);
  }, [service, visible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Tên dịch vụ (VI) là bắt buộc";
    if (!form.name_en) newErrors.name_en = "Tên dịch vụ (EN) là bắt buộc";
    return newErrors;
  };
  const handleSubmit = () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onSubmit(form);
  };

  return (
    <Dialog header={service ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ mới'} visible={visible} style={{ width: '500px' }} onHide={onHide} modal>
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="icon">Tên icon</label>
          <InputText id="icon" name="icon" value={form.icon || ''} onChange={handleChange} placeholder="fa-stethoscope, icon-house..." />
        </div>
        <div className="field">
          <label htmlFor="name">Tên dịch vụ (VI) <span style={{color: 'red'}}>*</span></label>
          <InputText id="name" name="name" value={form.name || ''} onChange={handleChange} className={errors.name ? 'p-invalid' : ''} />
          {errors.name && <small className="p-error">{errors.name}</small>}
        </div>
        <div className="field">
          <label htmlFor="description">Mô tả (VI)</label>
          <InputText id="description" name="description" value={form.description || ''} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="name_en">Tên dịch vụ (EN) <span style={{color: 'red'}}>*</span></label>
          <InputText id="name_en" name="name_en" value={form.name_en || ''} onChange={handleChange} className={errors.name_en ? 'p-invalid' : ''} />
          {errors.name_en && <small className="p-error">{errors.name_en}</small>}
        </div>
        <div className="field">
          <label htmlFor="description_en">Mô tả (EN)</label>
          <InputText id="description_en" name="description_en" value={form.description_en || ''} onChange={handleChange} />
        </div>
        <div className="field-checkbox mt-2">
          <Checkbox inputId="is_active" name="is_active" checked={!!form.is_active} onChange={e => setForm(prev => ({ ...prev, is_active: e.checked }))} />
          <label htmlFor="is_active" className="ml-2">Kích hoạt</label>
        </div>
      </div>
      <div className="flex justify-content-end gap-2 mt-4">
        <Button type="button" label="Hủy" className="p-button-outlined" onClick={onHide} disabled={loading} />
        <Button type="button" label={service ? 'Cập nhật' : 'Thêm mới'} className="p-button-primary" onClick={handleSubmit} loading={loading} />
      </div>
    </Dialog>
  );
};

export default ServiceDialog; 