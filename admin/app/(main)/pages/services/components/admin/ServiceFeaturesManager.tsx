import { useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Badge } from 'primereact/badge';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Panel } from 'primereact/panel';
import { ServiceFeature } from '../../types/services';
import { serviceFeatures as initialFeatures, servicePrices, services } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

export function ServiceFeaturesManager() {
  const { t, language } = useLanguage();
  const [features, setFeatures] = useState<ServiceFeature[]>(initialFeatures);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<ServiceFeature | null>(null);
  const [activeIndex, setActiveIndex] = useState<(number | null)[]>([0, 1, 2]);
  const [formData, setFormData] = useState({
    price_id: 1,
    feature_name: '',
    feature_name_en: '',
    feature_description: '',
    feature_description_en: ''
  });

  const getLocalizedText = (item: any, field: string) => {
    if (language === 'en' && item[`${field}_en`]) {
      return item[`${field}_en`];
    }
    return item[field];
  };

  // Group features by service
  const groupedFeatures = services.map(service => {
    const servicePricesForService = servicePrices.filter(p => p.service_id === service.service_id);
    const pricesWithFeatures = servicePricesForService.map(price => ({
      price,
      features: features.filter(f => f.price_id === price.price_id)
    })).filter(priceGroup => priceGroup.features.length > 0);

    return {
      service,
      pricesWithFeatures,
      totalFeatures: pricesWithFeatures.reduce((sum, pg) => sum + pg.features.length, 0)
    };
  }).filter(group => group.totalFeatures > 0);

  const handleAdd = () => {
    setEditingFeature(null);
    setFormData({
      price_id: servicePrices[0]?.price_id || 1,
      feature_name: '',
      feature_name_en: '',
      feature_description: '',
      feature_description_en: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (feature: ServiceFeature) => {
    setEditingFeature(feature);
    setFormData({
      price_id: feature.price_id,
      feature_name: feature.feature_name,
      feature_name_en: feature.feature_name_en || '',
      feature_description: feature.feature_description,
      feature_description_en: feature.feature_description_en || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (feature: ServiceFeature) => {
    confirmDialog({
      message: t('features.confirmDelete'),
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        setFeatures(features.filter(f => f.feature_id !== feature.feature_id));
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingFeature) {
      setFeatures(features.map(f =>
        f.feature_id === editingFeature.feature_id
          ? { ...f, ...formData }
          : f
      ));
    } else {
      const newFeature: ServiceFeature = {
        feature_id: Math.max(...features.map(f => f.feature_id)) + 1,
        ...formData,
        created_at: new Date().toISOString()
      };
      setFeatures([...features, newFeature]);
    }

    setIsDialogOpen(false);
  };

  const nameBodyTemplate = (rowData: ServiceFeature) => {
    return <span className="font-medium">{getLocalizedText(rowData, 'feature_name')}</span>;
  };

  const descriptionBodyTemplate = (rowData: ServiceFeature) => {
    return (
      <div className="max-w-xs truncate">
        {getLocalizedText(rowData, 'feature_description')}
      </div>
    );
  };

  const createdBodyTemplate = (rowData: ServiceFeature) => {
    return new Date(rowData.created_at).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US');
  };

  const actionsBodyTemplate = (rowData: ServiceFeature) => {
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

  const priceOptions = servicePrices.map(price => {
    const service = services.find(s => s.service_id === price.service_id);
    return {
      label: `${service ? getLocalizedText(service, 'service_name') : 'Unknown'} - ${getLocalizedText(price, 'price_description')}`,
      value: price.price_id,
      isPopular: price.is_popular
    };
  });

  const dialogFooter = (
    <div className="dialog-footer">
      <Button
        label={t('common.cancel')}
        icon="pi pi-times"
        onClick={() => setIsDialogOpen(false)}
        className="p-button-outlined"
      />
      <Button
        label={editingFeature ? t('common.update') : t('common.add')}
        icon="pi pi-check"
        onClick={handleSubmit}
      />
    </div>
  );

  const priceOptionTemplate = (option: any) => {
    return (
      <div className="flex items-center justify-between w-full">
        <span>{option.label}</span>
        {option.isPopular && (
          <Badge value={t('prices.popularBadge')} className="badge-popular ml-2" />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <ConfirmDialog />

      <div className="manager-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 'auto', paddingBottom: 10 }}>{t('features.list')}</h3>
        <Button
          label={t('features.add')}
          icon="pi pi-plus"
          onClick={handleAdd}
        />
      </div>

      <Accordion multiple activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ marginTop: 10 }}>
        {groupedFeatures.map((group, index) => (
          <AccordionTab
            key={group.service.service_id}
            header={
              <div className="flex items-center space-x-3">
                <i className={`${group.service.icon_name} text-lg`}></i>
                <div>
                  <h4 className="font-medium">{getLocalizedText(group.service, 'service_name')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {group.totalFeatures} {t('features.featuresCount')} • {group.pricesWithFeatures.length} {t('features.pricesCount')}
                  </p>
                </div>
              </div>
            }
          >
            <div className="space-y-4">
              {group.pricesWithFeatures.map((priceGroup, priceIndex) => (
                <Panel
                  key={priceGroup.price.price_id}
                  className="border-0"
                  header={
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 justify-center">
                        <span className="font-medium text-sm">
                          {getLocalizedText(priceGroup.price, 'price_description')} &nbsp;
                        </span>
                        {priceGroup.price.is_popular && (
                          <div className="justify-center" style={{marginTop:-5}}>
                            <Badge
                              value={t('prices.popularBadge')}
                              className="badge-popular"
                              style={{ marginLeft: 'auto', marginRight: 'auto',paddingBottom:10 }}
                            />
                           </div>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground justify-center">
                      &nbsp; {priceGroup.features.length} {t('features.featuresCount')}  
                      </span>
                    </div>


                    // <div className="flex items-center justify-between">
                    //   <div className="flex items-center space-x-2">
                    //     <span className="font-medium text-sm">
                    //       {getLocalizedText(priceGroup.price, 'price_description')}
                    //     </span>
                    //     {priceGroup.price.is_popular && (
                    //       <Badge value={t('prices.popularBadge')} className="badge-popular" />
                    //     )}
                    //   </div>
                    //   <span className="text-sm text-muted-foreground">
                    //     {priceGroup.features.length} {t('features.featuresCount')}
                    //   </span>
                    // </div>
                  }
                  toggleable
                >
                  <DataTable value={priceGroup.features} stripedRows>
                    <Column field="feature_id" header={t('common.id')} sortable style={{ width: '10%' }} />
                    <Column body={nameBodyTemplate} header={t('features.name')} sortable style={{ width: '25%' }} />
                    <Column body={descriptionBodyTemplate} header={t('features.description')} style={{ width: '40%' }} />
                    <Column body={createdBodyTemplate} header={t('features.created')} sortable style={{ width: '15%' }} />
                    <Column body={actionsBodyTemplate} header={t('features.actions')} style={{ width: '10%' }} />
                  </DataTable>
                </Panel>
              ))}
            </div>
          </AccordionTab>
        ))}
      </Accordion>

      <Dialog
        header={editingFeature ? t('features.edit') : t('features.addNew')}
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
                  htmlFor="price_id"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('features.pricePackage')}
                </label>
                <Dropdown
                  value={formData.price_id}
                  options={priceOptions}
                  onChange={(e) => setFormData({ ...formData, price_id: e.value })}
                  optionLabel="label"
                  optionValue="value"
                  itemTemplate={priceOptionTemplate}
                  placeholder={t('features.pricePackage')}
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
                  htmlFor="feature_name"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('features.name')} (Tiếng Việt) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <InputText
                  id="feature_name"
                  value={formData.feature_name}
                  onChange={(e) => setFormData({ ...formData, feature_name: e.target.value })}
                  required
                  placeholder={t('features.namePlaceholder')}
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
                  htmlFor="feature_name_en"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('features.name')} (English)
                </label>
                <InputText
                  id="feature_name_en"
                  value={formData.feature_name_en}
                  onChange={(e) => setFormData({ ...formData, feature_name_en: e.target.value })}
                  placeholder="e.g., Personal hygiene care"
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
                  htmlFor="feature_description"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('features.description')} (Tiếng Việt)
                </label>
                <InputTextarea
                  id="feature_description"
                  value={formData.feature_description}
                  onChange={(e) => setFormData({ ...formData, feature_description: e.target.value })}
                  rows={3}
                  placeholder={t('features.descriptionPlaceholder')}
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
                  htmlFor="feature_description_en"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  {t('features.description')} (English)
                </label>
                <InputTextarea
                  id="feature_description_en"
                  value={formData.feature_description_en}
                  onChange={(e) => setFormData({ ...formData, feature_description_en: e.target.value })}
                  rows={3}
                  placeholder="Detailed description of this feature..."
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
          </div>
        </form>
      </Dialog>

      {/* <Dialog
        header={editingFeature ? t('features.edit') : t('features.addNew')}
        visible={isDialogOpen}
        style={{ width: '600px' }}
        footer={dialogFooter}
        onHide={() => setIsDialogOpen(false)}
        modal
      >
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="price_id">{t('features.pricePackage')}</label>
            <Dropdown
              value={formData.price_id}
              options={priceOptions}
              onChange={(e) => setFormData({ ...formData, price_id: e.value })}
              optionLabel="label"
              optionValue="value"
              itemTemplate={priceOptionTemplate}
              placeholder={t('features.pricePackage')}
            />
          </div>

          <div className="form-field">
            <label htmlFor="feature_name">{t('features.name')} (Tiếng Việt)</label>
            <InputText
              id="feature_name"
              value={formData.feature_name}
              onChange={(e) => setFormData({ ...formData, feature_name: e.target.value })}
              required
              placeholder={t('features.namePlaceholder')}
            />
          </div>

          <div className="form-field">
            <label htmlFor="feature_name_en">{t('features.name')} (English)</label>
            <InputText
              id="feature_name_en"
              value={formData.feature_name_en}
              onChange={(e) => setFormData({ ...formData, feature_name_en: e.target.value })}
              placeholder="e.g., Personal hygiene care"
            />
          </div>

          <div className="form-field">
            <label htmlFor="feature_description">{t('features.description')} (Tiếng Việt)</label>
            <InputTextarea
              id="feature_description"
              value={formData.feature_description}
              onChange={(e) => setFormData({ ...formData, feature_description: e.target.value })}
              rows={3}
              placeholder={t('features.descriptionPlaceholder')}
            />
          </div>

          <div className="form-field">
            <label htmlFor="feature_description_en">{t('features.description')} (English)</label>
            <InputTextarea
              id="feature_description_en"
              value={formData.feature_description_en}
              onChange={(e) => setFormData({ ...formData, feature_description_en: e.target.value })}
              rows={3}
              placeholder="Detailed description of this feature..."
            />
          </div>
        </form>
      </Dialog> */}
    </div>
  );
}