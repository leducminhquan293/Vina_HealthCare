"use client";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import type { ToastMessage } from "primereact/toast";

interface ImageSliderItem {
  _id?: string;
  image_data?: string; // base64 string for preview
  display_order: number;
  title?: string;
  subtitle?: string;
  title_en?: string;
  subtitle_en?: string;
  status: "Active" | "Inactive";
  created_at?: string;
}

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

export default function ImageSliderPage() {
  const [sliders, setSliders] = useState<ImageSliderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<ImageSliderItem>({
    display_order: 1,
    title: "",
    subtitle: "",
    title_en: "",
    subtitle_en: "",
    status: "Active",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useRef<Toast | null>(null);

  const API_URL = "http://localhost:3001/image-slider";

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      // Convert image_data (Buffer) to base64 for preview
      setSliders(
        (Array.isArray(data) ? data : data.data || []).map((item: any) => ({
          ...item,
          image_data: item.image_data ? `data:image/jpeg;base64,${Buffer.from(item.image_data.data).toString("base64")}` : undefined,
        }))
      );
    } catch (e) {
      showToast("error", "Lỗi", "Không thể tải danh sách slider");
      setSliders([]);
    }
    setLoading(false);
  };

  const showToast = (severity: ToastMessage["severity"], summary: string, detail: string) => {
    toast.current?.show?.({ severity, summary, detail, life: 3000 });
  };

  const openNew = () => {
    setForm({
      display_order: 1,
      title: "",
      subtitle: "",
      title_en: "",
      subtitle_en: "",
      status: "Active",
    });
    setImageFile(null);
    setImagePreview(undefined);
    setIsEdit(false);
    setDialogVisible(true);
  };

  const openEdit = (rowData: ImageSliderItem) => {
    setForm(rowData);
    setImagePreview(rowData.image_data);
    setImageFile(null);
    setIsEdit(true);
    setDialogVisible(true);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!isEdit && !imageFile) newErrors.image_data = "Vui lòng chọn ảnh";
    if (!form.display_order) newErrors.display_order = "Thứ tự hiển thị là bắt buộc";
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const formData = new FormData();
      formData.append("display_order", String(form.display_order));
      if (form.title) formData.append("title", form.title);
      if (form.subtitle) formData.append("subtitle", form.subtitle);
      if (form.title_en) formData.append("title_en", form.title_en);
      if (form.subtitle_en) formData.append("subtitle_en", form.subtitle_en);
      formData.append("status", form.status);
      if (imageFile) formData.append("image_data", imageFile);
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `${API_URL}/${form._id}` : API_URL;
      const res = await fetch(url, {
        method,
        body: formData,
      });
      if (!res.ok) throw new Error("Lỗi khi lưu slider");
      showToast("success", "Thành công", isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
      setDialogVisible(false);
      fetchSliders();
    } catch (e: any) {
      showToast("error", "Lỗi", e?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = (rowData: ImageSliderItem) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa slider này?",
      header: "Xác nhận xóa",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const res = await fetch(`${API_URL}/${rowData._id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Lỗi khi xóa slider");
          showToast("success", "Thành công", "Đã xóa slider");
          fetchSliders();
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
      <div className="flex justify-content-end mb-3">
        <Button icon="pi pi-plus" label="Thêm mới" className="p-button-primary" onClick={openNew} />
      </div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable value={sliders} loading={loading} paginator rows={10} selectionMode="single" onRowSelect={e => openEdit(e.data as ImageSliderItem)}>
        <Column
          field="image_data"
          header="Hình ảnh"
          body={(rowData: ImageSliderItem) => rowData.image_data ? <img src={rowData.image_data} alt="slider" style={{ width: 80, height: 40, objectFit: 'cover' }} /> : null}
        />
        <Column field="display_order" header="Thứ tự" sortable />
        <Column field="title" header="Tiêu đề" />
        <Column field="subtitle" header="Phụ đề" />
        <Column field="title_en" header="Title (EN)" />
        <Column field="subtitle_en" header="Subtitle (EN)" />
        <Column field="status" header="Trạng thái" body={(rowData: ImageSliderItem) => rowData.status === "Active" ? "Hiển thị" : "Ẩn"} sortable />
        <Column field="created_at" header="Ngày tạo" body={(rowData: ImageSliderItem) => rowData.created_at ? new Date(rowData.created_at).toLocaleString() : ""} sortable />
        <Column
          header="Thao tác"
          body={(rowData: ImageSliderItem) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-outlined p-button-secondary mr-2" onClick={() => openEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => handleDelete(rowData)} />
            </>
          )}
          style={{ width: '120px' }}
        />
      </DataTable>
      <Dialog header={isEdit ? "Cập nhật slider" : "Thêm slider"} visible={dialogVisible} style={{ width: "40vw" }} footer={dialogFooter} onHide={() => setDialogVisible(false)}>
        <div className="p-fluid grid">
          <div className="field col-12">
            <label>Hình ảnh <span style={{color: 'red'}}>*</span></label>
            <FileUpload mode="basic" accept="image/*" maxFileSize={2000000} customUpload uploadHandler={onFileSelect} auto chooseLabel="Chọn ảnh" />
            {imagePreview && <img src={imagePreview} alt="preview" style={{ width: 120, height: 60, objectFit: 'cover', marginTop: 8 }} />}
            {errors.image_data && <small className="p-error">{errors.image_data}</small>}
          </div>
          <div className="field col-6">
            <label>Thứ tự hiển thị <span style={{color: 'red'}}>*</span></label>
            <InputText value={String(form.display_order)} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} required className={errors.display_order ? 'p-invalid' : ''} />
            {errors.display_order && <small className="p-error">{errors.display_order}</small>}
          </div>
          <div className="field col-6">
            <label>Trạng thái</label>
            <Dropdown value={form.status} options={statusOptions} onChange={e => setForm({ ...form, status: e.value })} />
          </div>
          <div className="field col-6">
            <label>Tiêu đề</label>
            <InputText value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Phụ đề</label>
            <InputText value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Title (EN)</label>
            <InputText value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
          </div>
          <div className="field col-6">
            <label>Subtitle (EN)</label>
            <InputText value={form.subtitle_en} onChange={e => setForm({ ...form, subtitle_en: e.target.value })} />
          </div>
        </div>
      </Dialog>
    </div>
  );
} 