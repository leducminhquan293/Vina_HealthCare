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
import type { ToastMessage } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";

interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  question_en: string;
  answer_en: string;
  is_active: boolean;
  created_at?: string;
}

const statusOptions = [
  { label: "Hiển thị", value: true },
  { label: "Ẩn", value: false },
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<FAQItem>({
    question: "",
    answer: "",
    question_en: "",
    answer_en: "",
    is_active: true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useRef<Toast | null>(null);

  const API_URL = "http://localhost:3001/faqs";

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setFaqs(Array.isArray(data) ? data : data.data || []);
    } catch (e) {
      showToast("error", "Lỗi", "Không thể tải danh sách câu hỏi");
      setFaqs([]);
    }
    setLoading(false);
  };

  const showToast = (severity: ToastMessage["severity"], summary: string, detail: string) => {
    toast.current?.show?.({ severity, summary, detail, life: 3000 });
  };

  const openNew = () => {
    setForm({
      question: "",
      answer: "",
      question_en: "",
      answer_en: "",
      is_active: true,
    });
    setIsEdit(false);
    setDialogVisible(true);
  };

  const openEdit = (rowData: FAQItem) => {
    setForm(rowData);
    setIsEdit(true);
    setDialogVisible(true);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.question) newErrors.question = "Câu hỏi (VI) là bắt buộc";
    if (!form.answer) newErrors.answer = "Trả lời (VI) là bắt buộc";
    if (!form.question_en) newErrors.question_en = "Câu hỏi (EN) là bắt buộc";
    if (!form.answer_en) newErrors.answer_en = "Trả lời (EN) là bắt buộc";
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `${API_URL}/${form._id}` : API_URL;
      const payload = form;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Lỗi khi lưu câu hỏi");
      showToast("success", "Thành công", isEdit ? "Cập nhật thành công" : "Thêm mới thành công");
      setDialogVisible(false);
      fetchFaqs();
    } catch (e: any) {
      showToast("error", "Lỗi", e?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = (rowData: FAQItem) => {
    confirmDialog({
      message: "Bạn có chắc muốn xóa câu hỏi này?",
      header: "Xác nhận xóa",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const res = await fetch(`${API_URL}/${rowData._id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Lỗi khi xóa câu hỏi");
          showToast("success", "Thành công", "Đã xóa câu hỏi");
          fetchFaqs();
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
      <div className="flex justify-content-end mb-3">
        <Button icon="pi pi-plus" label="Thêm mới" className="p-button-primary" onClick={openNew} />
      </div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable value={faqs} loading={loading} paginator rows={10} selectionMode="single" onRowSelect={e => openEdit(e.data as FAQItem)}>
        <Column field="question" header="Câu hỏi (VI)" sortable />
        <Column field="answer" header="Trả lời (VI)" sortable />
        <Column field="question_en" header="Câu hỏi (EN)" sortable />
        <Column field="answer_en" header="Trả lời (EN)" sortable />
        <Column field="is_active" header="Trạng thái" body={(rowData: FAQItem) => rowData.is_active ? "Hiển thị" : "Ẩn"} sortable />
        <Column field="created_at" header="Ngày tạo" body={(rowData: FAQItem) => rowData.created_at ? new Date(rowData.created_at).toLocaleString() : ""} sortable />
        <Column
          header="Thao tác"
          body={(rowData: FAQItem) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-outlined p-button-secondary mr-2" onClick={() => openEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => handleDelete(rowData)} />
            </>
          )}
          style={{ width: '120px' }}
        />
      </DataTable>
      <Dialog header={isEdit ? "Cập nhật câu hỏi" : "Thêm câu hỏi"} visible={dialogVisible} style={{ width: "40vw" }} footer={dialogFooter} onHide={() => setDialogVisible(false)}>
        <div className="p-fluid grid">
          <div className="field col-12">
            <label>Câu hỏi (VI) <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} required className={errors.question ? 'p-invalid' : ''} />
            {errors.question && <small className="p-error">{errors.question}</small>}
          </div>
          <div className="field col-12">
            <label>Trả lời (VI) <span style={{color: 'red'}}>*</span></label>
            <InputTextarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} rows={3} required className={errors.answer ? 'p-invalid' : ''} />
            {errors.answer && <small className="p-error">{errors.answer}</small>}
          </div>
          <div className="field col-12">
            <label>Câu hỏi (EN) <span style={{color: 'red'}}>*</span></label>
            <InputText value={form.question_en} onChange={e => setForm({ ...form, question_en: e.target.value })} required className={errors.question_en ? 'p-invalid' : ''} />
            {errors.question_en && <small className="p-error">{errors.question_en}</small>}
          </div>
          <div className="field col-12">
            <label>Trả lời (EN) <span style={{color: 'red'}}>*</span></label>
            <InputTextarea value={form.answer_en} onChange={e => setForm({ ...form, answer_en: e.target.value })} rows={3} required className={errors.answer_en ? 'p-invalid' : ''} />
            {errors.answer_en && <small className="p-error">{errors.answer_en}</small>}
          </div>
          <div className="field col-6">
            <label>Trạng thái</label>
            <Dropdown value={form.is_active} options={statusOptions} onChange={(e: { value: boolean }) => setForm({ ...form, is_active: e.value })} />
          </div>
        </div>
      </Dialog>
    </div>
  );
} 