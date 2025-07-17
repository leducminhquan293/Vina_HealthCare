/* eslint-disable @next/next/no-img-element */
'use client';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { TabView, TabPanel } from 'primereact/tabview';
import { ServicesManager } from './components/admin/ServicesManager';
import { ServicePricesManager } from './components/admin/ServicePricesManager';
import { ServiceFeaturesManager } from './components/admin/ServiceFeaturesManager';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function AdminPanel() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="admin-card mb-6">
          <div className="admin-card-header">
            <div className="flex items-center justify-between">
              <div>
                <h1>{t('admin.title')}</h1>
                <p className="text-muted-foreground mt-2">
                  {t('admin.subtitle')}
                </p>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
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
                  <h2>{t('services.title')}</h2>
                  <p>
                    {t('services.subtitle')}
                  </p>
                </div>
                <ServicesManager />
              </div>
            </TabPanel>

            <TabPanel header={t('admin.tabs.prices')}>
              <div className="space-y-6">
                <div className="section-header">
                  <h2>{t('prices.title')}</h2>
                  <p>
                    {t('prices.subtitle')}
                  </p>
                </div>
                <ServicePricesManager />
              </div>
            </TabPanel>

            <TabPanel header={t('admin.tabs.features')}>
              <div className="space-y-6">
                <div className="section-header">
                  <h2>{t('features.title')}</h2>
                  <p>
                    {t('features.subtitle')}
                  </p>
                </div>
                <ServiceFeaturesManager />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AdminPanel />
    </LanguageProvider>
  );
}