import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { ServiceFeature, ServicePrice } from './types';

interface FeatureDialogProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: Partial<ServiceFeature>) => void;
  feature?: ServiceFeature | null;
  loading?: boolean;
  prices: ServicePrice[];
}

const initialState = {
  price_id: undefined,
  is_active: true,
  name: '',
  description: '',
  name_en: '',
  description_en: '',
};

const FeatureDialog: React.FC<FeatureDialogProps> = ({ visible, onHide, onSubmit, feature, loading, prices }) => {
  const [form, setForm] = useState<any>(initialState);

  // Lấy danh sách dịch vụ từ prices nếu có
  const getServiceName = (service_id: string | number) => {
    // Lấy tên từ description hoặc service_id
    return prices.find(p => String(p.service_id) === String(service_id))?.description || service_id;
  };

  const priceOptions = prices.map(p => ({
    label: (
      <span>
        {p.is_popular && <span style={{ background: '#f7c948', color: '#fff', borderRadius: 4, padding: '2px 6px', fontSize: 12, marginRight: 6 }}>Phổ biến</span>}
        <b>{getServiceName(p.description)}</b> - {p.price?.toLocaleString('vi-VN')} VNĐ - {p.description}
      </span>
    ),
    value: p._id || p.price_id
  }));

  useEffect(() => {
    if (feature) setForm(feature);
    else setForm(initialState);
  }, [feature, visible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog header={feature ? 'Cập nhật tính năng' : 'Thêm tính năng'} visible={visible} style={{ width: '500px' }} onHide={onHide} modal>
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="price_id">Mức giá</label>
          <Dropdown id="price_id" name="price_id" value={form.price_id} options={priceOptions} onChange={e => setForm((prev: any) => ({ ...prev, price_id: e.value }))} placeholder="Chọn mức giá" />
        </div>
        <div className="field">
          <label htmlFor="name">Tên tính năng (VI)</label>
          <InputText id="name" name="name" value={form.name || ''} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="description">Mô tả (VI)</label>
          <InputText id="description" name="description" value={form.description || ''} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="name_en">Tên tính năng (EN)</label>
          <InputText id="name_en" name="name_en" value={form.name_en || ''} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="description_en">Mô tả (EN)</label>
          <InputText id="description_en" name="description_en" value={form.description_en || ''} onChange={handleChange} />
        </div>
        {/* <div className="field">
          <label htmlFor="icon">Tên icon</label>
          <InputText id="icon" name="icon" value={form.icon || ''} onChange={handleChange} placeholder="fa-stethoscope, icon-house..." />
        </div> */}
        <div className="field-checkbox mt-2">
          <Checkbox inputId="is_active" name="is_active" checked={!!form.is_active} onChange={e => setForm((prev: any) => ({ ...prev, is_active: e.checked }))} />
          <label htmlFor="is_active" className="ml-2">Kích hoạt</label>
        </div>
      </div>
      <div className="flex justify-content-end gap-2 mt-4">
        <Button type="button" label="Hủy" className="p-button-outlined" onClick={onHide} disabled={loading} />
        <Button type="button" label={feature ? 'Cập nhật' : 'Thêm mới'} className="p-button-primary" onClick={() => onSubmit(form)} loading={loading} />
      </div>
    </Dialog>
  );
};

export default FeatureDialog; 