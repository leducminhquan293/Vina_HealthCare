import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Service } from '../../types/services';
import { services as initialServices } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

export function ServicesManager() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    service_name: '',
    service_name_en: '',
    description: '',
    description_en: '',
    icon_name: ''
  });

  // Load Font Awesome for icons
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(link);
  }, []);

  const getLocalizedText = (item: any, field: string) => {
    if (language === 'en' && item[`${field}_en`]) {
      return item[`${field}_en`];
    }
    return item[field];
  };

  const handleAdd = () => {
    setEditingService(null);
    setFormData({
      service_name: '',
      service_name_en: '',
      description: '',
      description_en: '',
      icon_name: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      service_name: service.service_name,
      service_name_en: service.service_name_en || '',
      description: service.description,
      description_en: service.description_en || '',
      icon_name: service.icon_name
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (service: Service) => {
    confirmDialog({
      message: t('services.confirmDelete'),
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        setServices(services.filter(s => s.service_id !== service.service_id));
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingService) {
      setServices(services.map(s =>
        s.service_id === editingService.service_id
          ? { ...s, ...formData }
          : s
      ));
    } else {
      const newService: Service = {
        service_id: Math.max(...services.map(s => s.service_id)) + 1,
        ...formData,
        created_at: new Date().toISOString()
      };
      setServices([...services, newService]);
    }

    setIsDialogOpen(false);
  };

  const nameBodyTemplate = (rowData: Service) => {
    return getLocalizedText(rowData, 'service_name');
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
        <i className={`${rowData.icon_name}`}></i>
        <span className="text-sm text-muted-foreground">{rowData.icon_name}</span>
      </div>
    );
  };

  const createdBodyTemplate = (rowData: Service) => {
    return new Date(rowData.created_at).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US');
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
        <Column field="service_id" header={t('common.id')} sortable style={{ width: '10%' }} />
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
                  value={formData.service_name}
                  onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
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
                  value={formData.service_name_en}
                  onChange={(e) => setFormData({ ...formData, service_name_en: e.target.value })}
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
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
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

      {/* <Dialog
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
          <div className="grid" style={{ rowGap: '1rem' }}>
            <div className="col-12 md:col-6">
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
                  value={formData.service_name}
                  onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
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
            <div className="col-12 md:col-6">
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
                  value={formData.service_name_en}
                  onChange={(e) => setFormData({ ...formData, service_name_en: e.target.value })}
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
            <div className="col-12 md:col-6">
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
                    width: '100',
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
            <div className="col-12 md:col-6">
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
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
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
      </Dialog> */}

      {/* <Dialog
        header={editingService ? t('services.edit') : t('services.addNew')}
        visible={isDialogOpen}
        style={{ width: '600px' }}
        footer={dialogFooter}
        onHide={() => setIsDialogOpen(false)}
        modal
      >
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="service_name">{t('services.name')} (Tiếng Việt)</label>
            <InputText
              id="service_name"
              value={formData.service_name}
              onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="service_name_en">{t('services.name')} (English)</label>
            <InputText
              id="service_name_en"
              value={formData.service_name_en}
              onChange={(e) => setFormData({ ...formData, service_name_en: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">{t('services.description')} (Tiếng Việt)</label>
            <InputTextarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="form-field">
            <label htmlFor="description_en">{t('services.description')} (English)</label>
            <InputTextarea
              id="description_en"
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              rows={3}
            />
          </div>

          <div className="form-field">
            <label htmlFor="icon_name">{t('services.icon')}</label>
            <InputText
              id="icon_name"
              value={formData.icon_name}
              onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
              placeholder={t('services.iconPlaceholder')}
            />
            <p className="form-hint">
              {t('services.iconHint')} <a href="https://fontawesome.com/icons" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">fontawesome.com</a>
            </p>
          </div>
        </form>
      </Dialog> */}
    </div>
  );
}