import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Badge } from 'primereact/badge';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { ServicePrice } from '../../types/services';
import { servicePrices as initialPrices, services } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { serviceApi } from '../../service.services';

export function ServicePricesManager({listPrice=[],listService=[]}) {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<ServicePrice[]>(listService);
  const [prices, setPrices] = useState<ServicePrice[]>(listPrice);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<ServicePrice | null>(null);
  const [activeIndex, setActiveIndex] = useState<(number | null)[]>([0, 1, 2]);
  const [formData, setFormData] = useState({
    _id: 1,
    price: 0,
    description: '',
    description_en: '',
    is_popular: false
  });

  // useEffect(() => {
  //   const fetchPriceServices = async () => {
  //     try {
  //       const data = await serviceApi.getAllPriceServices();
  //       console.log(data);
  //       setPrices(data);
  //       // setLoading(false);
  //     } catch (err) {
  //       // setError('Không thể tải dữ liệu: ' + err.message);
  //       // setLoading(false);
  //       // toast.current.show({ severity: 'error', summary: 'Lỗi', detail: err.message, life: 3000 });
  //     }
  //   };
  //   fetchPriceServices();
  // }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getLocalizedText = (item: any, field: string) => {
    if (language === 'en' && item[`${field}_en`]) {
      return item[`${field}_en`];
    }
    return item[field];
  };

  // Group prices by service
  const groupedPrices = services.map(service => ({
    service,
    prices: prices.filter(price => price.service_id === service._id)
  })).filter(group => group.prices.length > 0);

  const handleAdd = () => {
    setEditingPrice(null);
    setFormData({
      _id: 1,
      price: 0,
      description: '',
      description_en: '',
      is_popular: false
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (price: ServicePrice) => {
    setEditingPrice(price);
    setFormData({
      _id: price._id,
      price: price.price,
      description: price.description,
      description_en: price.description_en || '',
      is_popular: price.is_popular
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (price: ServicePrice) => {
    confirmDialog({
      message: t('prices.confirmDelete'),
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        setPrices(prices.filter(p => p._id !== price._id));
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPrice) {
      setPrices(prices.map(p =>
        p._id === editingPrice._id
          ? { ...p, ...formData }
          : p
      ));
    } else {
      const newPrice: ServicePrice = {
        _id: Math.max(...prices.map(p => p._id)) + 1,
        ...formData,
        createdAt: new Date().toISOString()
      };
      setPrices([...prices, newPrice]);
    }

    setIsDialogOpen(false);
  };

  const priceBodyTemplate = (rowData: ServicePrice) => {
    return <span className="font-medium">{formatPrice(rowData.price)}</span>;
  };

  const descriptionBodyTemplate = (rowData: ServicePrice) => {
    return getLocalizedText(rowData, 'description');
  };

  const popularBodyTemplate = (rowData: ServicePrice) => {
    return rowData.is_popular ? (
      <Badge value={t('prices.popularBadge')} className="badge-popular" />
    ) : null;
  };

  const createdBodyTemplate = (rowData: ServicePrice) => {
    return new Date(rowData.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US');
  };

  const actionsBodyTemplate = (rowData: ServicePrice) => {
    return (
      <div className="table-actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-sm p-button-outlined"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          style={{ marginLeft: 10 }}
          className="p-button-sm p-button-outlined p-button-danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  const serviceOptions = services.map(service => ({
    label: getLocalizedText(service, 'service_name'),
    value: service._id,
    icon: service.icon
  }));

  const dialogFooter = (
    <div className="dialog-footer">
      <Button
        label={t('common.cancel')}
        icon="pi pi-times"
        onClick={() => setIsDialogOpen(false)}
        className="p-button-outlined"
      />
      <Button
        label={editingPrice ? t('common.update') : t('common.add')}
        icon="pi pi-check"
        onClick={handleSubmit}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <ConfirmDialog />

      <div className="manager-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>{t('prices.list')}</h3>
        <Button
          label={t('prices.add')}
          icon="pi pi-plus"
          onClick={handleAdd}
        />
      </div>

      <Accordion multiple activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ marginTop: 10 }}>
        {groupedPrices.map((group, index) => (
          <AccordionTab
            key={group.service._id}
            header={
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center space-x-3">
                  <i className={`${group.service.icon} text-lg`}></i>
                  <div>
                    <h4 className="font-medium">{getLocalizedText(group.service, 'service_name')}</h4>&nbsp;
                    <p className="text-sm text-muted-foreground">
                    &nbsp; {group.prices.length} {t('prices.pricesCount')} 
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {group.prices.filter(p => p.is_popular).length > 0 && (
                    <Badge
                      value={`${group.prices.filter(p => p.is_popular).length} ${t('prices.popularCount')}`}
                      className="badge-popular"
                    />
                  )}
                </div>
              </div>
            }
          >
            <DataTable value={group.prices} stripedRows>
              <Column field="_id" header={t('common.id')} sortable style={{ width: '10%' }} />
              <Column body={priceBodyTemplate} header={t('common.price')} sortable style={{ width: '20%' }} />
              <Column body={descriptionBodyTemplate} header={t('common.description')} style={{ width: '30%' }} />
              <Column body={popularBodyTemplate} header={t('prices.popularBadge')} style={{ width: '15%' }} />
              <Column body={createdBodyTemplate} header={t('prices.created')} sortable style={{ width: '15%' }} />
              <Column body={actionsBodyTemplate} header={t('prices.actions')} style={{ width: '10%' }} />
            </DataTable>
          </AccordionTab>
        ))}
      </Accordion>

      <Dialog
        header={editingPrice ? t('prices.edit') : t('prices.addNew')}
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
                  htmlFor="_id"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('prices.service')}
                </label>
                <Dropdown
                  value={formData._id}
                  options={serviceOptions}
                  onChange={(e) => setFormData({ ...formData, _id: e.value })}
                  optionLabel="label"
                  optionValue="value"
                  placeholder={t('prices.service')}
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
                  htmlFor="price"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('prices.price')} <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <InputText
                  id="price"
                  type="number"
                  value={formData.price.toString()}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                  min="0"
                  step="1000"
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
                  {t('prices.priceDescription')} (Tiếng Việt) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <InputText
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder={t('prices.priceDescriptionPlaceholder')}
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
                  {t('prices.priceDescription')} (English)
                </label>
                <InputText
                  id="description_en"
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  placeholder="e.g., Nursing once a week"
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
            <div className="col-12" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ marginRight: '0.5rem' }}>
                <InputSwitch
                  id="is_popular"
                  checked={formData.is_popular}
                  onChange={(e) => setFormData({ ...formData, is_popular: e.value })}
                  style={{
                    width: '2.5rem',
                    height: '1.5rem',
                  }}
                />
              </div>
              <label
                htmlFor="is_popular"
                style={{
                  fontWeight: '500',
                  color: '#374151',
                }}
              >
                {t('prices.popular')}
              </label>
            </div>
          </div>
        </form>
      </Dialog>

     
    </div>
  );
}