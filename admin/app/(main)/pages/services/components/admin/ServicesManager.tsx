'use client'
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Service, ServicePrice } from '../../types/services';
import { services as initialServices } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { serviceApi } from '../../service.services';
interface ServicesManagerProps {
  listService: Service[];
}

export const ServicesManager: React.FC<ServicesManagerProps> = ({ listService = [] }) => {
// export function ServicesManager({ listService = []}) {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>(listService);
 

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    name_en: '',
    description: '',
    description_en: '',
    icon: ''
  });

  // Load Font Awesome for icons
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(link);
    serviceApi.getAllServices()
  }, []);

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const data = await serviceApi.getAllServices();
  //       setServices(data);
        
  //       // setLoading(false);
  //     } catch (err) {
  //       setServices([])
  //       // setError(err.message);
  //       // setLoading(false);
  //     }
  //   };
  //   fetchServices();
  // }, [])
  

  const getLocalizedText = (item: any, field: string) => {
    if (language === 'en' && item[`${field}_en`]) {
      return item[`${field}_en`];
    }
    return item[field];
  };

  const handleAdd = () => {
    setEditingService(null);
    setFormData({
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      icon: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      name_en: service.name_en || '',
      description: service.description,
      description_en: service.description_en || '',
      icon: service.icon
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (service: Service) => {
    confirmDialog({
      message: t('services.confirmDelete'),
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        setServices(services.filter(s => s._id !== service._id));
        await serviceApi.deleteService(service._id);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingService) {
      // setServices(services.map(s =>
      //   s._id === editingService._id
      //     ? { ...s, ...formData }
      //     : s
      // ));
      const updatedService = await serviceApi.updateService(editingService._id, formData);
      setServices(services.map(s => (s._id === updatedService.id ? updatedService : s)));
      // toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật dịch vụ thành công', life: 3000 });
    } else {
      // const newService: Service = {
      //   _id: Math.max(...services.map(s => s._id)) + 1,
      //   ...formData,
      //   created_at: new Date().toISOString()
      // };
      // setServices([...services, newService]);
      const newService = await serviceApi.createService(formData);
      setServices([...services, newService]);
      // toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Tạo dịch vụ thành công', life: 3000 });
    }

    setIsDialogOpen(false);
  }

  //
  //   try {

  //     setDialogVisible(false);
  //     setFormData({ name: '', category: '', description: '' });
  //     setSelectedService(null);
  //   } catch (err) {
  //     toast.current.show({ severity: 'error', summary: 'Lỗi', detail: err.message, life: 3000 });
  //   }
  // };

  const nameBodyTemplate = (rowData: Service) => {
    return getLocalizedText(rowData, 'name');
  };

  const descriptionBodyTemplate = (rowData: Service) => {
    return (
      <div className="max-w-xs truncate">
        {getLocalizedText(rowData, 'description')}
      </div>
    );
  };

  const iconBodyTemplate = (rowData: Service) => {
    return (
      <div className="flex items-center space-x-2">
        <i className={`${rowData.icon}`}></i>
        <span className="text-sm text-muted-foreground">{rowData.icon}</span>
      </div>
    );
  };

  const createdBodyTemplate = (rowData: Service) => {
    return new Date(rowData.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US');
  };

  const actionsBodyTemplate = (rowData: Service) => {
    return (
      <div className="table-actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-sm p-button-outlined"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-sm p-button-outlined p-button-danger"
          style={{ marginLeft: 10 }}
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  const dialogFooter = (
    <div className="dialog-footer">
      <Button
        label={t('common.cancel')}
        icon="pi pi-times"
        onClick={() => setIsDialogOpen(false)}
        className="p-button-outlined"
      />
      <Button
        label={editingService ? t('common.update') : t('common.add')}
        icon="pi pi-check"
        onClick={handleSubmit}
      />
    </div>
  );

  console.log('M')
  console.log(services)
  return (
    <div className="space-y-6">
      <ConfirmDialog />

      <div className="manager-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>{t('services.list')}</h3>
        <Button
          label={t('services.add')}
          icon="pi pi-plus"
          onClick={handleAdd}
        />
      </div>

      <DataTable value={services} stripedRows tableStyle={{ minWidth: '50rem', marginTop: 10 }}>
        <Column field="_id" header={t('common.id')} sortable style={{ width: '10%' }} />
        <Column body={nameBodyTemplate} header={t('services.name')} sortable style={{ width: '20%' }} />
        <Column body={descriptionBodyTemplate} header={t('services.description')} style={{ width: '30%' }} />
        <Column body={iconBodyTemplate} header="Icon" style={{ width: '15%' }} />
        <Column body={createdBodyTemplate} header={t('services.created')} sortable style={{ width: '15%' }} />
        <Column body={actionsBodyTemplate} header={t('services.actions')} style={{ width: '10%' }} />
      </DataTable>

      <Dialog
        header={editingService ? t('services.edit') : t('services.addNew')}
        visible={isDialogOpen}
        style={{
          width: '600px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: '0.375rem',
        }}
        footer={dialogFooter}
        onHide={() => setIsDialogOpen(false)}
        modal
        className="p-fluid"
      >
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          <div className="grid" >
            <div className="col-12">
              <div className="field" style={{ marginBottom: '1rem' }}>
                <label
                  htmlFor="service_name"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('services.name')} (Tiếng Việt) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <InputText
                  id="service_name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #d1d5db',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="field" style={{ marginBottom: '1rem' }}>
                <label
                  htmlFor="service_name_en"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('services.name')} (English)
                </label>
                <InputText
                  id="service_name_en"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #d1d5db',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="field" style={{ marginBottom: '1rem' }}>
                <label
                  htmlFor="description"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('services.description')} (Tiếng Việt)
                </label>
                <InputTextarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #d1d5db',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="field" style={{ marginBottom: '1rem' }}>
                <label
                  htmlFor="description_en"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('services.description')} (English)
                </label>
                <InputTextarea
                  id="description_en"
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #d1d5db',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="field" style={{ marginBottom: '1rem' }}>
                <label
                  htmlFor="icon_name"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('services.icon')}
                </label>
                <InputText
                  id="icon_name"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder={t('services.iconPlaceholder')}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #d1d5db',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
                <p
                  style={{
                    marginTop: '0.25rem',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                  }}
                >
                  {t('services.iconHint')}{' '}
                  <a
                    href="https://fontawesome.com/icons"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#2563eb', textDecoration: 'underline', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.target.style.color = '#1d4ed8')}
                    onMouseLeave={(e) => (e.target.style.color = '#2563eb')}
                  >
                    fontawesome.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </Dialog>


    </div>
  );
}