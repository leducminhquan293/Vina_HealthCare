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
import { InputTextarea } from "primereact/inputtextarea";
import type { ToastMessage } from "primereact/toast";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";

interface NewsItem {
  _id?: string;
  title: string;
  content: string;
  title_en: string;
  content_en: string;
  image?: string; // base64 string for preview
  status: string;
  publish_date: string;
}

const statusOptions = [
  { label: "Draft", value: "Draft" },
  { label: "Published", value: "Published" },
  { label: "Hidden", value: "Hidden" },
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<NewsItem>({
    title: "",
    content: "",
    title_en: "",
    content_en: "",
    status: "Draft",
    publish_date: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useRef<Toast | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const API_URL = "http://localhost:3001/news";

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setNews(
        (Array.isArray(data) ? data : data.data || []).map((item: any) => ({
          ...item,
          image: item.image ? `data:image/jpeg;base64,${Buffer.from(item.image.data).toString("base64")}` : undefined,
        }))
      );
    } catch (e) {
      showToast("error", "Lỗi", "Không thể tải danh sách tin tức");
      setNews([]);
    }
    setLoading(false);
  };

  const showToast = (severity: ToastMessage["severity"], summary: string, detail: string) => {
    toast.current?.show?.({ severity, summary, detail, life: 3000 });
  };

  const openNew = () => {
    setForm({
      title: "",
      content: "",
      title_en: "",
      content_en: "",
      status: "Draft",
      publish_date: "",
    });
    setImageFile(null);
    setImagePreview(undefined);
    setIsEdit(false);
    setDialogVisible(true);
  };

  const openEdit = (rowData: NewsItem) => {
    setForm(rowData);
    setImagePreview(rowData.image);
    setImageFile(null);
    setIsEdit(true);
    setDialogVisible(true);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.title) newErrors.title = "Tiêu đề là bắt buộc";
    if (!form.content) newErrors.content = "Nội dung là bắt buộc";
    if (!form.title_en) newErrors.title_en = "Title (EN) là bắt buộc";
    if (!form.content_en) newErrors.content_en = "Content (EN) là bắt buộc";
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("title_en", form.title_en);
      formData.append("content_en", form.content_en);
      formData.append("status", form.status);
      if (form.publish_date) formData.append("publish_date", form.publish_date);
      if (!isEdit) formData.append("posted_by", "binhbt");
      if (imageFile) formData.append("image", imageFile);
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `${API_URL}/${form._id}` : API_URL;
      const res = await fetch(url, {
        method,
        body: formData,
      });
      if (!res.ok) throw new Error("Lỗi khi lưu tin tức");
      showToast("success", "Thành công", isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
      setDialogVisible(false);
      fetchNews();
    } catch (e: any) {
      showToast("error", "Lỗi", e?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = (rowData: NewsItem) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa tin này?",
      header: "Xác nhận xóa",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const res = await fetch(`${API_URL}/${rowData._id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Lỗi khi xóa tin tức");
          showToast("success", "Thành công", "Đã xóa tin tức");
          fetchNews();
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
      <DataTable value={news} loading={loading} paginator rows={10} selectionMode="single" onRowSelect={e => openEdit(e.data as NewsItem)}>
        <Column
          field="image"
          header="Hình ảnh"
          body={(rowData: NewsItem) => rowData.image ? <img src={rowData.image} alt="news" style={{ width: 80, height: 40, objectFit: 'cover' }} /> : null}
        />
        <Column field="title" header="Tiêu đề" sortable />
        <Column field="title_en" header="Title (EN)" sortable />
        <Column field="status" header="Trạng thái" sortable />
        <Column field="publish_date" header="Ngày đăng" body={(rowData: NewsItem) => rowData.publish_date ? new Date(rowData.publish_date).toLocaleString() : ""} sortable />
        <Column
          header="Thao tác"
          body={(rowData: NewsItem) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-outlined p-button-secondary mr-2" onClick={() => openEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => handleDelete(rowData)} />
            </>
          )}
          style={{ width: '120px' }}
        />
      </DataTable>
      <Dialog header={isEdit ? "Cập nhật tin tức" : "Thêm tin tức"} visible={dialogVisible} style={{ width: "40vw" }} footer={dialogFooter} onHide={() => setDialogVisible(false)}>
        <div className="p-fluid grid">
          <div className="field col-12">
            <label>Hình ảnh</label>
            <FileUpload mode="basic" accept="image/*" maxFileSize={2000000} customUpload uploadHandler={onFileSelect} auto chooseLabel="Chọn ảnh" />
            {imagePreview && <img src={imagePreview} alt="preview" style={{ width: 120, height: 60, objectFit: 'cover', marginTop: 8 }} />}
          </div>
          <div className="field col-12">
            <label>Tiêu đề <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className={errors.title ? 'p-invalid' : ''} />
            {errors.title && <small className="p-error">{errors.title}</small>}
          </div>
          <div className="field col-12">
            <label>Nội dung <span style={{color: 'red'}}>*</span></label>
            <InputTextarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={3} required className={errors.content ? 'p-invalid' : ''} />
            {errors.content && <small className="p-error">{errors.content}</small>}
          </div>
          <div className="field col-12">
            <label>Tiêu đề (EN) <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} required className={errors.title_en ? 'p-invalid' : ''} />
            {errors.title_en && <small className="p-error">{errors.title_en}</small>}
          </div>
          <div className="field col-12">
            <label>Nội dung (EN) <span style={{color: 'red'}}>*</span></label>
            <InputTextarea value={form.content_en} onChange={e => setForm({ ...form, content_en: e.target.value })} rows={3} required className={errors.content_en ? 'p-invalid' : ''} />
            {errors.content_en && <small className="p-error">{errors.content_en}</small>}
          </div>
          <div className="field col-6">
            <label>Trạng thái</label>
            <Dropdown value={form.status} options={statusOptions} onChange={e => setForm({ ...form, status: e.value })} />
          </div>
          <div className="field col-6">
            <label>Ngày đăng</label>
            <Calendar value={form.publish_date ? new Date(form.publish_date) : undefined} onChange={e => setForm({ ...form, publish_date: e.value ? e.value.toISOString() : "" })} dateFormat="yy-mm-dd" showIcon placeholder="YYYY-MM-DD" />
          </div>
        </div>
      </Dialog>
    </div>
  );
} 