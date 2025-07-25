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

interface HomepageSection {
  _id?: string;
  name: string;
  slug: string;
  is_active: boolean;
  display_order: number;
  subtitle?: string;
  icon_name?: string;
  background_color?: string;
  created_at?: string;
  updated_at?: string;
}

const initialForm: HomepageSection = {
  name: "",
  slug: "",
  is_active: true,
  display_order: 0,
  subtitle: "",
  icon_name: "",
  background_color: "",
};

export default function HomepageSectionsPage() {
  const [data, setData] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<HomepageSection>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useRef<any>(null);

  const API_URL = "http://localhost:3001/homepage-sections";

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
      showToast("error", "Lỗi", "Không thể tải danh sách khối trang chủ");
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

  const openEdit = (row: HomepageSection) => {
    setForm(row);
    setIsEdit(true);
    setErrors({});
    setDialogVisible(true);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Tên khối là bắt buộc";
    if (!form.slug) newErrors.slug = "Slug là bắt buộc";
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
      if (!res.ok) throw new Error("Lỗi khi lưu khối");
      showToast("success", "Thành công", isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
      setDialogVisible(false);
      fetchData();
    } catch (e: any) {
      showToast("error", "Lỗi", e?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = (row: HomepageSection) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa khối này?",
      header: "Xác nhận xóa",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const res = await fetch(`${API_URL}/${row._id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Lỗi khi xóa khối");
          showToast("success", "Thành công", "Đã xóa khối");
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
      <DataTable value={data} loading={loading} paginator rows={10} selectionMode="single" onRowSelect={e => openEdit(e.data as HomepageSection)}>
        <Column field="name" header="Tên khối" sortable />
        <Column field="slug" header="Slug" sortable />
        <Column field="subtitle" header="Mô tả phụ" />
        <Column field="icon_name" header="Icon" />
        <Column field="background_color" header="Màu nền" />
        <Column field="display_order" header="Thứ tự" sortable />
        <Column field="is_active" header="Kích hoạt" body={row => row.is_active ? '✔️' : ''} />
        <Column field="created_at" header="Ngày tạo" body={row => row.created_at ? new Date(row.created_at).toLocaleString() : ""} />
        <Column
          header="Thao tác"
          body={(row: HomepageSection) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-outlined p-button-secondary mr-2" onClick={() => openEdit(row)} />
              <Button icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => handleDelete(row)} />
            </>
          )}
          style={{ width: '120px' }}
        />
      </DataTable>
      <Dialog header={isEdit ? "Cập nhật khối" : "Thêm khối"} visible={dialogVisible} style={{ width: "40vw" }} footer={dialogFooter} onHide={() => setDialogVisible(false)}>
        <div className="p-fluid grid">
          <div className="field col-12">
            <label>Tên khối <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className={errors.name ? 'p-invalid' : ''} />
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>
          <div className="field col-12">
            <label>Slug <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required className={errors.slug ? 'p-invalid' : ''} />
            {errors.slug && <small className="p-error">{errors.slug}</small>}
          </div>
          <div className="field col-12">
            <label>Mô tả phụ</label>
            <InputText value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Icon</label>
            <InputText value={form.icon_name} onChange={e => setForm({ ...form, icon_name: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Màu nền</label>
            <InputText value={form.background_color} onChange={e => setForm({ ...form, background_color: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Thứ tự hiển thị</label>
            <InputText value={String(form.display_order)} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} />
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