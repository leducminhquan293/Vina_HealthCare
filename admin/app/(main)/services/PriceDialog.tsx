import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Service, ServicePrice } from './types';

interface PriceDialogProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: Partial<ServicePrice>) => void;
  price?: ServicePrice | null;
  loading?: boolean;
  services: Service[];
}

const initialState = {
  service_id: undefined,
  price: '',
  is_popular: false,
  is_active: true,
};

const PriceDialog: React.FC<PriceDialogProps> = ({ visible, onHide, onSubmit, price, loading, services }) => {
  const [form, setForm] = useState<any>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (price) setForm(price);
    else setForm(initialState);
  }, [price, visible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.service_id) newErrors.service_id = "Dịch vụ là bắt buộc";
    if (!form.price) newErrors.price = "Giá là bắt buộc";
    return newErrors;
  };
  const handleSubmit = () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onSubmit(form);
  };

  return (
    <Dialog header={price ? 'Cập nhật giá dịch vụ' : 'Thêm giá dịch vụ'} visible={visible} style={{ width: '400px' }} onHide={onHide} modal>
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="service_id">Dịch vụ <span style={{color: 'red'}}>*</span></label>
          <Dropdown id="service_id" name="service_id" value={form.service_id} options={services.map(s => ({ label: s.name, value: s._id }))} onChange={e => setForm((prev: any) => ({ ...prev, service_id: e.value }))} placeholder="Chọn dịch vụ" className={errors.service_id ? 'p-invalid' : ''} />
          {errors.service_id && <small className="p-error">{errors.service_id}</small>}
        </div>
        <div className="field">
          <label htmlFor="price">Giá <span style={{color: 'red'}}>*</span></label>
          <InputText id="price" name="price" value={form.price} onChange={handleChange} keyfilter="money" className={errors.price ? 'p-invalid' : ''} />
          {errors.price && <small className="p-error">{errors.price}</small>}
        </div>
        <div className="field">
          <label htmlFor="description">Mô tả (VI)</label>
          <InputText id="description" name="description" value={form.description || ''} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="description_en">Mô tả (EN)</label>
          <InputText id="description_en" name="description_en" value={form.description_en || ''} onChange={handleChange} />
        </div>
        <div className="field-checkbox mt-2">
          <Checkbox inputId="is_popular" name="is_popular" checked={!!form.is_popular} onChange={e => setForm((prev: any) => ({ ...prev, is_popular: e.checked }))} />
          <label htmlFor="is_popular" className="ml-2">Nổi bật</label>
        </div>
        <div className="field-checkbox mt-2">
          <Checkbox inputId="is_active" name="is_active" checked={!!form.is_active} onChange={e => setForm((prev: any) => ({ ...prev, is_active: e.checked }))} />
          <label htmlFor="is_active" className="ml-2">Kích hoạt</label>
        </div>
      </div>
      <div className="flex justify-content-end gap-2 mt-4">
        <Button type="button" label="Hủy" className="p-button-outlined" onClick={onHide} disabled={loading} />
        <Button type="button" label={price ? 'Cập nhật' : 'Thêm mới'} className="p-button-primary" onClick={handleSubmit} loading={loading} />
      </div>
    </Dialog>
  );
};

export default PriceDialog; 