/* eslint-disable @next/next/no-img-element */
'use client';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { TabView, TabPanel } from 'primereact/tabview';
import { ServicesManager } from './components/admin/ServicesManager';
import { ServicePricesManager } from './components/admin/ServicePricesManager';
import { ServiceFeaturesManager } from './components/admin/ServiceFeaturesManager';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useEffect, useState } from 'react';
import { serviceApi } from './service.services';
import { Service, ServicePrice } from './types/services';

function AdminPanel() {

  const { t } = useLanguage();

  const [services, setServices] = useState<Service[]>([]);
  const [prices, setPrices] = useState<ServicePrice[]>([]);
  const [features, setFeatures] = useState<ServicePrice[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceApi.getAllServices();
        console.log(data);
        setServices(data);
        // setLoading(false);
      } catch (err) {
        setServices([])
        // setError(err.message);
        // setLoading(false);
      }
    };
    fetchServices();
  }, [])

  useEffect(() => {
    const fetchPriceServices = async () => {
      try {
        const data = await serviceApi.getAllPriceServices();
        setPrices(data);
        console.log(data);
        // setLoading(false);
      } catch (err) {
        // setError('Không thể tải dữ liệu: ' + err.message);
        // setLoading(false);
        // toast.current.show({ severity: 'error', summary: 'Lỗi', detail: err.message, life: 3000 });
      }
    };
    fetchPriceServices();
  }, []);

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const data = await serviceApi.getAllFeatureServices();
        setFeatures(data);
        console.log(data);
        // setLoading(false);
      } catch (err) {
        setFeatures([])
        // setError(err.message);
        // setLoading(false);
      }
    };
    fetchFeature();
  }, [])

  if (
    services &&
    prices &&
    features) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="admin-card mb-6">
            <div className="admin-card-header">
              <div className="flex items-center justify-end"> {/* Changed to justify-end to align to right */}
                <div className="mr-auto"> {/* Pushes content to the left */}
                  <h1>{t('admin.title')}</h1>
                  <p className="text-muted-foreground mt-2">
                    {t('admin.subtitle')}
                  </p>
                </div>
                <LanguageSwitcher /> {/* Adjusted width to w-24 */}
              </div>
            </div>
          </div>

          <div className="admin-card">
            <TabView>
              <TabPanel header={t('admin.tabs.services')}>
                <div className="space-y-6">
                  <div className="section-header">
                    {/* <h2>{t('services.title')}</h2> */}
                    <p>
                      {/* {t('services.subtitle')} */}
                    </p>
                  </div>
                  <ServicesManager listService={services} />
                </div>
              </TabPanel>

              <TabPanel header={t('admin.tabs.prices')}>
                <div className="space-y-6">
                  <div className="section-header">
                    {/* <h2>{t('prices.title')}</h2> */}
                    <p>
                      {/* {t('prices.subtitle')} */}
                    </p>
                  </div>
                  <ServicePricesManager listService={services} listPrice={prices} />
                </div>
              </TabPanel>

              <TabPanel header={t('admin.tabs.features')}>
                <div className="space-y-6">
                  <div className="section-header">
                    {/* <h2>{t('features.title')}</h2> */}
                    <p>
                      {/* {t('features.subtitle')} */}
                    </p>
                  </div>
                  <ServiceFeaturesManager listFeature={features} listService={services} listPrice={prices} />
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>null</div>
  }

}

export default function App() {
  return (
    <LanguageProvider>
      <AdminPanel />
    </LanguageProvider>
  );
}