"use client";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Checkbox } from "primereact/checkbox";

interface Facility {
  _id?: string;
  name: string;
  name_en: string;
  email?: string;
  phone_numbers?: string;
  business_license_number?: string;
  medical_license_number?: string;
  primary: "Primary" | "Branch" | "Partner";
  is_active: boolean;
  created_at?: string;
}

const initialForm: Facility = {
  name: "",
  name_en: "",
  email: "",
  phone_numbers: "",
  business_license_number: "",
  medical_license_number: "",
  primary: "Branch",
  is_active: true,
};

const primaryOptions = [
  { label: "Trụ sở chính", value: "Primary" },
  { label: "Chi nhánh", value: "Branch" },
  { label: "Đối tác", value: "Partner" },
];

export default function FacilitiesPage() {
  const [data, setData] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<Facility>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useRef<any>(null);

  const API_URL = "http://localhost:3001/facilities";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const d = await res.json();
      setData(Array.isArray(d) ? d : d.data || []);
    } catch {
      showToast("error", "Lỗi", "Không thể tải danh sách cơ sở");
      setData([]);
    }
    setLoading(false);
  };

  const showToast = (severity: any, summary: string, detail: string) => {
    toast.current?.show?.({ severity, summary, detail, life: 3000 });
  };

  const openNew = () => {
    setForm(initialForm);
    setIsEdit(false);
    setErrors({});
    setDialogVisible(true);
  };

  const openEdit = (row: Facility) => {
    setForm(row);
    setIsEdit(true);
    setErrors({});
    setDialogVisible(true);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Tên cơ sở là bắt buộc";
    if (!form.name_en) newErrors.name_en = "Tên cơ sở (EN) là bắt buộc";
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `${API_URL}/${form._id}` : API_URL;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Lỗi khi lưu cơ sở");
      showToast("success", "Thành công", isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
      setDialogVisible(false);
      fetchData();
    } catch (e: any) {
      showToast("error", "Lỗi", e?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = (row: Facility) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa cơ sở này?",
      header: "Xác nhận xóa",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const res = await fetch(`${API_URL}/${row._id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Lỗi khi xóa cơ sở");
          showToast("success", "Thành công", "Đã xóa cơ sở");
          fetchData();
        } catch (e: any) {
          showToast("error", "Lỗi", e?.message || "Có lỗi xảy ra");
        }
      },
    });
  };

  const dialogFooter = (
    <div>
      <Button label="Hủy" icon="pi pi-times" onClick={() => setDialogVisible(false)} className="p-button-text" />
      <Button label={isEdit ? "Cập nhật" : "Thêm mới"} icon="pi pi-check" onClick={handleSave} autoFocus />
    </div>
  );

  return (
    <div className="card p-4">
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="flex justify-content-end mb-3">
        <Button icon="pi pi-plus" label="Thêm mới" className="p-button-primary" onClick={openNew} />
      </div>
      <DataTable value={data} loading={loading} paginator rows={10} selectionMode="single" onRowSelect={e => openEdit(e.data as Facility)}>
        <Column field="name" header="Tên cơ sở" sortable />
        <Column field="name_en" header="Tên cơ sở (EN)" sortable />
        <Column field="email" header="Email" />
        <Column field="phone_numbers" header="Số điện thoại" />
        <Column field="business_license_number" header="Số GPKD" />
        <Column field="medical_license_number" header="Số GP KCB" />
        <Column field="primary" header="Loại" body={row => primaryOptions.find(opt => opt.value === row.primary)?.label || row.primary} sortable />
        <Column field="is_active" header="Kích hoạt" body={row => row.is_active ? '✔️' : ''} />
        <Column field="created_at" header="Ngày tạo" body={row => row.created_at ? new Date(row.created_at).toLocaleString() : ""} />
        <Column
          header="Thao tác"
          body={(row: Facility) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-outlined p-button-secondary mr-2" onClick={() => openEdit(row)} />
              <Button icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => handleDelete(row)} />
            </>
          )}
          style={{ width: '120px' }}
        />
      </DataTable>
      <Dialog header={isEdit ? "Cập nhật cơ sở" : "Thêm cơ sở"} visible={dialogVisible} style={{ width: "40vw" }} footer={dialogFooter} onHide={() => setDialogVisible(false)}>
        <div className="p-fluid grid">
          <div className="field col-12">
            <label>Tên cơ sở <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className={errors.name ? 'p-invalid' : ''} />
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>
          <div className="field col-12">
            <label>Tên cơ sở (EN) <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.name_en} onChange={e => setForm({ ...form, name_en: e.target.value })} required className={errors.name_en ? 'p-invalid' : ''} />
            {errors.name_en && <small className="p-error">{errors.name_en}</small>}
          </div>
          <div className="field col-6">
            <label>Email</label>
            <InputText value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Số điện thoại</label>
            <InputText value={form.phone_numbers} onChange={e => setForm({ ...form, phone_numbers: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Số GPKD</label>
            <InputText value={form.business_license_number} onChange={e => setForm({ ...form, business_license_number: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Số GP KCB</label>
            <InputText value={form.medical_license_number} onChange={e => setForm({ ...form, medical_license_number: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Loại</label>
            <select className="p-inputtext" value={form.primary} onChange={e => setForm({ ...form, primary: e.target.value as Facility["primary"] })}>
              {primaryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="field col-6 flex align-items-center">
            <Checkbox inputId="is_active" checked={!!form.is_active} onChange={e => setForm({ ...form, is_active: e.checked })} />
            <label htmlFor="is_active" className="ml-2">Kích hoạt</label>
          </div>
        </div>
      </Dialog>
    </div>
  );
} 