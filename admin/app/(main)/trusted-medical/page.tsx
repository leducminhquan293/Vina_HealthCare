"use client";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from "primereact/fileupload";

interface TrustedMedicalBrand {
  _id?: string;
  name: string;
  logo_data?: string;
  website_url?: string;
  description?: string;
  display_order: number;
  is_featured: boolean;
  created_at?: string;
}

const initialForm: TrustedMedicalBrand = {
  name: "",
  logo_data: "",
  website_url: "",
  description: "",
  display_order: 0,
  is_featured: true,
};

export default function TrustedMedicalPage() {
  const [data, setData] = useState<TrustedMedicalBrand[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<TrustedMedicalBrand>(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useRef<any>(null);

  const API_URL = "http://localhost:3001/trusted-medical";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const d = await res.json();
      debugger
      setData((Array.isArray(d) ? d : d.data || []).map((item:any) => ({
        ...item,
        logo_data: item.logo_data ? `data:image/jpeg;base64,${Buffer.from(item.logo_data.data).toString("base64")}` : undefined,
      })));
    } catch {
      showToast("error", "Lỗi", "Không thể tải danh sách thương hiệu");
      setData([]);
    }
    setLoading(false);
  };
  
  const showToast = (severity: any, summary: string, detail: string) => {
    toast.current?.show?.({ severity, summary, detail, life: 3000 });
  };

  const openNew = () => {
    setForm(initialForm);
    setImageFile(null);
    setImagePreview(undefined);
    setIsEdit(false);
    setErrors({});
    setDialogVisible(true);
  };

  const openEdit = (row: TrustedMedicalBrand) => {
    setForm(row);
    setImagePreview(row.logo_data);
    setImageFile(null);
    setIsEdit(true);
    setErrors({});
    setDialogVisible(true);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Tên thương hiệu là bắt buộc";
    if (!isEdit && !imageFile) newErrors.logo_data = "Vui lòng chọn logo";
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("display_order", String(form.display_order));
      formData.append("is_featured", String(form.is_featured));
      if (form.website_url) formData.append("website_url", form.website_url);
      if (form.description) formData.append("description", form.description);
      if (imageFile) formData.append("logo_data", imageFile);
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `${API_URL}/${form._id}` : API_URL;
      const res = await fetch(url, {
        method,
        body: formData,
      });
      if (!res.ok) throw new Error("Lỗi khi lưu thương hiệu");
      showToast("success", "Thành công", isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
      setDialogVisible(false);
      fetchData();
    } catch (e: any) {
      showToast("error", "Lỗi", e?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = (row: TrustedMedicalBrand) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa thương hiệu này?",
      header: "Xác nhận xóa",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const res = await fetch(`${API_URL}/${row._id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Lỗi khi xóa thương hiệu");
          showToast("success", "Thành công", "Đã xóa thương hiệu");
          fetchData();
        } catch (e: any) {
          showToast("error", "Lỗi", e?.message || "Có lỗi xảy ra");
        }
      },
    });
  };

  const onFileSelect = (e: any) => {
    const file = e.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev: any) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
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
      <DataTable value={data} loading={loading} paginator rows={10} selectionMode="single" onRowSelect={e => openEdit(e.data as TrustedMedicalBrand)}>
        <Column field="logo_data" header="Logo" body={row => row.logo_data ? <img src={row.logo_data} alt="Logo" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} /> : null} style={{ width: 80 }} />
        <Column field="name" header="Tên thương hiệu" sortable />
        <Column field="website_url" header="Website" body={row => row.website_url ? <a href={row.website_url} target="_blank" rel="noopener noreferrer">{row.website_url}</a> : ""} />
        <Column field="description" header="Mô tả" />
        <Column field="display_order" header="Thứ tự" sortable />
        <Column field="is_featured" header="Nổi bật" body={row => row.is_featured ? '✔️' : ''} />
        <Column field="created_at" header="Ngày tạo" body={row => row.created_at ? new Date(row.created_at).toLocaleString() : ""} />
        <Column
          header="Thao tác"
          body={(row: TrustedMedicalBrand) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-outlined p-button-secondary mr-2" onClick={() => openEdit(row)} />
              <Button icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => handleDelete(row)} />
            </>
          )}
          style={{ width: '120px' }}
        />
      </DataTable>
      <Dialog header={isEdit ? "Cập nhật thương hiệu" : "Thêm thương hiệu"} visible={dialogVisible} style={{ width: "40vw" }} footer={dialogFooter} onHide={() => setDialogVisible(false)}>
        <div className="p-fluid grid">
          <div className="field col-12">
            <label>Logo <span style={{color: 'red'}}>*</span></label>
            <FileUpload mode="basic" accept="image/*" maxFileSize={2000000} customUpload uploadHandler={onFileSelect} auto chooseLabel="Chọn logo" />
            {imagePreview && <img src={imagePreview} alt="Logo" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 8 }} />}
            {errors.logo_data && <small className="p-error">{errors.logo_data}</small>}
          </div>
          <div className="field col-12">
            <label>Tên thương hiệu <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className={errors.name ? 'p-invalid' : ''} />
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>
          <div className="field col-12">
            <label>Website</label>
            <InputText value={form.website_url} onChange={e => setForm({ ...form, website_url: e.target.value })} />
          </div>
          <div className="field col-12">
            <label>Mô tả</label>
            <InputTextarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} />
          </div>
          <div className="field col-6">
            <label>Thứ tự hiển thị</label>
            <InputText value={String(form.display_order)} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} />
          </div>
          <div className="field col-6 flex align-items-center">
            <Checkbox inputId="is_featured" checked={!!form.is_featured} onChange={e => setForm({ ...form, is_featured: e.checked })} />
            <label htmlFor="is_featured" className="ml-2">Nổi bật (hiển thị trang chủ)</label>
          </div>
        </div>
      </Dialog>
    </div>
  );
} 