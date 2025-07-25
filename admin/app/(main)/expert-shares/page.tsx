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

interface ExpertShare {
  _id?: string;
  image_data?: string; // base64
  full_name: string;
  description: string;
  department: string;
  description_en: string;
  department_en: string;
  is_active: boolean;
  created_at?: string;
}

const initialForm: ExpertShare = {
  full_name: "",
  description: "",
  department: "",
  description_en: "",
  department_en: "",
  is_active: true,
  image_data: ""
};

export default function ExpertSharesPage() {
  const [data, setData] = useState<ExpertShare[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<ExpertShare>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useRef<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const API_URL = "http://localhost:3001/expert-shares";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const d = await res.json();
      setData((Array.isArray(d) ? d : d.data || []).map((item: any) => ({
        ...item,
        // image_data: item.image_data ? (item.image_data.startsWith('data:') ? item.image_data : `data:image/jpeg;base64,${item.image_data}`) : undefined,
        image_data: item.image_data ? `data:image/jpeg;base64,${Buffer.from(item.image_data.data).toString("base64")}` : undefined,
      })));
    } catch {
      showToast("error", "Lỗi", "Không thể tải danh sách chia sẻ");
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

  const openEdit = (row: ExpertShare) => {
    setForm(row);
    setImagePreview(row.image_data);
    setImageFile(null);
    setIsEdit(true);
    setErrors({});
    setDialogVisible(true);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!isEdit && !imageFile) newErrors.image_data = "Vui lòng chọn ảnh";
    if (!form.full_name) newErrors.full_name = "Họ tên là bắt buộc";
    if (!form.description) newErrors.description = "Lời chia sẻ là bắt buộc";
    if (!form.department) newErrors.department = "Khoa là bắt buộc";
    if (!form.description_en) newErrors.description_en = "Lời chia sẻ (EN) là bắt buộc";
    if (!form.department_en) newErrors.department_en = "Khoa (EN) là bắt buộc";
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const formData = new FormData();
      formData.append("full_name", form.full_name);
      formData.append("description", form.description);
      formData.append("department", form.department);
      formData.append("description_en", form.description_en);
      formData.append("department_en", form.department_en);
      formData.append("is_active", String(form.is_active));
      if (imageFile) formData.append("image_data", imageFile);
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `${API_URL}/${form._id}` : API_URL;
      const res = await fetch(url, {
        method,
        body: formData,
      });
      if (!res.ok) throw new Error("Lỗi khi lưu chia sẻ");
      showToast("success", "Thành công", isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
      setDialogVisible(false);
      fetchData();
    } catch (e: any) {
      showToast("error", "Lỗi", e?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = (row: ExpertShare) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa chia sẻ này?",
      header: "Xác nhận xóa",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const res = await fetch(`${API_URL}/${row._id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Lỗi khi xóa chia sẻ");
          showToast("success", "Thành công", "Đã xóa chia sẻ");
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

  const imageBodyTemplate = (row: ExpertShare) => {
    if (row.image_data) {
      return <img src={row.image_data.startsWith('data:') ? row.image_data : `data:image/jpeg;base64,${row.image_data}`} alt="Ảnh" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />;
    }
    return <span>-</span>;
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
      <DataTable value={data} loading={loading} paginator rows={10} selectionMode="single" onRowSelect={e => openEdit(e.data as ExpertShare)}>
        <Column field="image_data" header="Ảnh" body={row => row.image_data ? <img src={row.image_data} alt="Ảnh" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} /> : null} style={{ width: 80 }} />
        <Column field="full_name" header="Họ tên" sortable />
        <Column field="department" header="Khoa" sortable />
        <Column field="description" header="Lời chia sẻ" />
        <Column field="department_en" header="Khoa (EN)" />
        <Column field="description_en" header="Lời chia sẻ (EN)" />
        <Column field="is_active" header="Kích hoạt" body={row => row.is_active ? '✔️' : ''} />
        <Column field="created_at" header="Ngày tạo" body={row => row.created_at ? new Date(row.created_at).toLocaleString() : ""} />
        <Column
          header="Thao tác"
          body={(row: ExpertShare) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-outlined p-button-secondary mr-2" onClick={() => openEdit(row)} />
              <Button icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => handleDelete(row)} />
            </>
          )}
          style={{ width: '120px' }}
        />
      </DataTable>
      <Dialog header={isEdit ? "Cập nhật chia sẻ" : "Thêm chia sẻ"} visible={dialogVisible} style={{ width: "40vw" }} footer={dialogFooter} onHide={() => setDialogVisible(false)}>
        <div className="p-fluid grid">
          <div className="field col-12">
            <label>Ảnh <span style={{color: 'red'}}>*</span></label>
            <FileUpload mode="basic" accept="image/*" maxFileSize={2000000} customUpload uploadHandler={onFileSelect} auto chooseLabel="Chọn ảnh" />
            {imagePreview && <img src={imagePreview} alt="Ảnh" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 8 }} />}
            {errors.image_data && <small className="p-error">{errors.image_data}</small>}
          </div>
          <div className="field col-12">
            <label>Họ tên <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required className={errors.full_name ? 'p-invalid' : ''} />
            {errors.full_name && <small className="p-error">{errors.full_name}</small>}
          </div>
          <div className="field col-12">
            <label>Lời chia sẻ <span style={{color: 'red'}}>*</span></label>
            <InputTextarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} required className={errors.description ? 'p-invalid' : ''} />
            {errors.description && <small className="p-error">{errors.description}</small>}
          </div>
          <div className="field col-12">
            <label>Khoa <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} required className={errors.department ? 'p-invalid' : ''} />
            {errors.department && <small className="p-error">{errors.department}</small>}
          </div>
          <div className="field col-12">
            <label>Lời chia sẻ (EN) <span style={{color: 'red'}}>*</span></label>
            <InputTextarea value={form.description_en} onChange={e => setForm({ ...form, description_en: e.target.value })} rows={2} required className={errors.description_en ? 'p-invalid' : ''} />
            {errors.description_en && <small className="p-error">{errors.description_en}</small>}
          </div>
          <div className="field col-12">
            <label>Khoa (EN) <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.department_en} onChange={e => setForm({ ...form, department_en: e.target.value })} required className={errors.department_en ? 'p-invalid' : ''} />
            {errors.department_en && <small className="p-error">{errors.department_en}</small>}
          </div>
          <div className="field col-12">
            <Checkbox inputId="is_active" checked={!!form.is_active} onChange={e => setForm({ ...form, is_active: e.checked })} />
            <label htmlFor="is_active" className="ml-2">Kích hoạt</label>
          </div>
        </div>
      </Dialog>
    </div>
  );
} 