import { useState } from 'react';
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

export function ServicePricesManager() {
  const { t, language } = useLanguage();
  const [prices, setPrices] = useState<ServicePrice[]>(initialPrices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<ServicePrice | null>(null);
  const [activeIndex, setActiveIndex] = useState<(number | null)[]>([0, 1, 2]);
  const [formData, setFormData] = useState({
    service_id: 1,
    price: 0,
    price_description: '',
    price_description_en: '',
    is_popular: false
  });

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
    prices: prices.filter(price => price.service_id === service.service_id)
  })).filter(group => group.prices.length > 0);

  const handleAdd = () => {
    setEditingPrice(null);
    setFormData({
      service_id: 1,
      price: 0,
      price_description: '',
      price_description_en: '',
      is_popular: false
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (price: ServicePrice) => {
    setEditingPrice(price);
    setFormData({
      service_id: price.service_id,
      price: price.price,
      price_description: price.price_description,
      price_description_en: price.price_description_en || '',
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
        setPrices(prices.filter(p => p.price_id !== price.price_id));
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPrice) {
      setPrices(prices.map(p => 
        p.price_id === editingPrice.price_id 
          ? { ...p, ...formData }
          : p
      ));
    } else {
      const newPrice: ServicePrice = {
        price_id: Math.max(...prices.map(p => p.price_id)) + 1,
        ...formData,
        created_at: new Date().toISOString()
      };
      setPrices([...prices, newPrice]);
    }
    
    setIsDialogOpen(false);
  };

  const priceBodyTemplate = (rowData: ServicePrice) => {
    return <span className="font-medium">{formatPrice(rowData.price)}</span>;
  };

  const descriptionBodyTemplate = (rowData: ServicePrice) => {
    return getLocalizedText(rowData, 'price_description');
  };

  const popularBodyTemplate = (rowData: ServicePrice) => {
    return rowData.is_popular ? (
      <Badge value={t('prices.popularBadge')} className="badge-popular" />
    ) : null;
  };

  const createdBodyTemplate = (rowData: ServicePrice) => {
    return new Date(rowData.created_at).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US');
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
          className="p-button-sm p-button-outlined p-button-danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  const serviceOptions = services.map(service => ({
    label: getLocalizedText(service, 'service_name'),
    value: service.service_id,
    icon: service.icon_name
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
      
      <div className="manager-header">
        <h3>{t('prices.list')}</h3>
        <Button
          label={t('prices.add')}
          icon="pi pi-plus"
          onClick={handleAdd}
        />
      </div>

      <Accordion multiple activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        {groupedPrices.map((group, index) => (
          <AccordionTab
            key={group.service.service_id}
            header={
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center space-x-3">
                  <i className={`${group.service.icon_name} text-lg`}></i>
                  <div>
                    <h4 className="font-medium">{getLocalizedText(group.service, 'service_name')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {group.prices.length} {t('prices.pricesCount')}
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
              <Column field="price_id" header={t('common.id')} sortable style={{ width: '10%' }} />
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
        style={{ width: '600px' }}
        footer={dialogFooter}
        onHide={() => setIsDialogOpen(false)}
        modal
      >
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="service_id">{t('prices.service')}</label>
            <Dropdown
              value={formData.service_id}
              options={serviceOptions}
              onChange={(e) => setFormData({...formData, service_id: e.value})}
              optionLabel="label"
              optionValue="value"
              placeholder={t('prices.service')}
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="price">{t('prices.price')}</label>
            <InputText
              id="price"
              type="number"
              value={formData.price.toString()}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              required
              min="0"
              step="1000"
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="price_description">{t('prices.priceDescription')} (Tiếng Việt)</label>
            <InputText
              id="price_description"
              value={formData.price_description}
              onChange={(e) => setFormData({...formData, price_description: e.target.value})}
              required
              placeholder={t('prices.priceDescriptionPlaceholder')}
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="price_description_en">{t('prices.priceDescription')} (English)</label>
            <InputText
              id="price_description_en"
              value={formData.price_description_en}
              onChange={(e) => setFormData({...formData, price_description_en: e.target.value})}
              placeholder="e.g., Nursing once a week"
            />
          </div>
          
          <div className="form-field-inline">
            <InputSwitch
              id="is_popular"
              checked={formData.is_popular}
              onChange={(e) => setFormData({...formData, is_popular: e.value})}
            />
            <label htmlFor="is_popular">{t('prices.popular')}</label>
          </div>
        </form>
      </Dialog>
    </div>
  );
}