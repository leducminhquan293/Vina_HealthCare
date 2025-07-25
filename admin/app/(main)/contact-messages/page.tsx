"use client";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

interface ContactMessage {
  _id?: string;
  full_name: string;
  email?: string;
  phone?: string;
  message: string;
  status: "New" | "Processed" | "Replied";
  created_at?: string;
}

const initialForm: ContactMessage = {
  full_name: "",
  email: "",
  phone: "",
  message: "",
  status: "New",
};

const statusOptions = [
  { label: "Mới", value: "New" },
  { label: "Đã xử lý", value: "Processed" },
  { label: "Đã phản hồi", value: "Replied" },
];

export default function ContactMessagesPage() {
  const [data, setData] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<ContactMessage>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useRef<any>(null);

  const API_URL = "http://localhost:3001/contact-messages";

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
      showToast("error", "Lỗi", "Không thể tải danh sách thông điệp");
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

  const openEdit = (row: ContactMessage) => {
    setForm(row);
    setIsEdit(true);
    setErrors({});
    setDialogVisible(true);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.full_name) newErrors.full_name = "Họ tên là bắt buộc";
    if (!form.message) newErrors.message = "Nội dung là bắt buộc";
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
      if (!res.ok) throw new Error("Lỗi khi lưu thông điệp");
      showToast("success", "Thành công", isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
      setDialogVisible(false);
      fetchData();
    } catch (e: any) {
      showToast("error", "Lỗi", e?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = (row: ContactMessage) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa thông điệp này?",
      header: "Xác nhận xóa",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const res = await fetch(`${API_URL}/${row._id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Lỗi khi xóa thông điệp");
          showToast("success", "Thành công", "Đã xóa thông điệp");
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
      <DataTable value={data} loading={loading} paginator rows={10} selectionMode="single" onRowSelect={e => openEdit(e.data as ContactMessage)}>
        <Column field="full_name" header="Họ tên" sortable />
        <Column field="email" header="Email" />
        <Column field="phone" header="Số điện thoại" />
        <Column field="message" header="Nội dung" />
        <Column field="status" header="Trạng thái" body={row => statusOptions.find(opt => opt.value === row.status)?.label || row.status} sortable />
        <Column field="created_at" header="Ngày gửi" body={row => row.created_at ? new Date(row.created_at).toLocaleString() : ""} />
        <Column
          header="Thao tác"
          body={(row: ContactMessage) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-outlined p-button-secondary mr-2" onClick={() => openEdit(row)} />
              <Button icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => handleDelete(row)} />
            </>
          )}
          style={{ width: '120px' }}
        />
      </DataTable>
      <Dialog header={isEdit ? "Cập nhật thông điệp" : "Thêm thông điệp"} visible={dialogVisible} style={{ width: "40vw" }} footer={dialogFooter} onHide={() => setDialogVisible(false)}>
        <div className="p-fluid grid">
          <div className="field col-12">
            <label>Họ tên <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required className={errors.full_name ? 'p-invalid' : ''} />
            {errors.full_name && <small className="p-error">{errors.full_name}</small>}
          </div>
          <div className="field col-6">
            <label>Email</label>
            <InputText value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Số điện thoại</label>
            <InputText value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="field col-12">
            <label>Nội dung <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required className={errors.message ? 'p-invalid' : ''} />
            {errors.message && <small className="p-error">{errors.message}</small>}
          </div>
          <div className="field col-6">
            <label>Trạng thái</label>
            <select className="p-inputtext" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as ContactMessage["status"] })}>
              {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </Dialog>
    </div>
  );
} 