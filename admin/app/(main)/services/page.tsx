'use client';
import React, { useState, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import ServiceTable from './ServiceTable';
import PriceTable from './PriceTable';
import FeatureTable from './FeatureTable';
import ServiceDialog from './ServiceDialog';
import PriceDialog from './PriceDialog';
import FeatureDialog from './FeatureDialog';
import { Service, ServicePrice, ServiceFeature } from './types';
import {
  getServices, addService, editService, deleteService,
  getServicePrices, addPrice, editPrice, deletePrice,
  getServiceFeatures, addFeature, editFeature, deleteFeature
} from './api';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Messages } from 'primereact/messages';
import { useRef } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';

const ServicesPage = () => {
  // State cho Service
  const [services, setServices] = useState<Service[]>([]);
  const [serviceDialogVisible, setServiceDialogVisible] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceLoading, setServiceLoading] = useState(false);

  // State cho Price
  const [prices, setPrices] = useState<ServicePrice[]>([]);
  const [priceDialogVisible, setPriceDialogVisible] = useState(false);
  const [editingPrice, setEditingPrice] = useState<ServicePrice | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  // State cho Feature
  const [features, setFeatures] = useState<ServiceFeature[]>([]);
  const [featureDialogVisible, setFeatureDialogVisible] = useState(false);
  const [editingFeature, setEditingFeature] = useState<ServiceFeature | null>(null);
  const [featureLoading, setFeatureLoading] = useState(false);

  const messagesRef = useRef<any>(null);

  // Lấy danh sách dịch vụ
  const fetchServices = async () => {
    try {
      setServiceLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (err) {
      messagesRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Không thể tải danh sách dịch vụ!' });
    } finally {
      setServiceLoading(false);
    }
  };

  // Lấy danh sách giá dịch vụ
  const fetchPrices = async () => {
    try {
      const data = await getServicePrices();
      setPrices(data);
    } catch (err) {
      alert('Không thể tải danh sách giá dịch vụ!');
    }
  };

  // Lấy danh sách đặc điểm
  const fetchFeatures = async () => {
    try {
      const data = await getServiceFeatures();
      setFeatures(data);
    } catch (err) {
      alert('Không thể tải danh sách đặc điểm!');
    }
  };

  useEffect(() => {
    fetchServices();
    fetchPrices();
    fetchFeatures();
  }, []);

  // CRUD Service
  const handleAdd = () => {
    setEditingService(null);
    setServiceDialogVisible(true);
  };
  const handleEdit = (service: Service) => {
    setEditingService(service);
    setServiceDialogVisible(true);
  };
  const handleDelete = async (service: Service) => {
    if (window.confirm('Bạn có chắc muốn xóa dịch vụ này?')) {
      setServiceLoading(true);
      try {
        const id = service._id || service.service_id;
        await deleteService(id);
        messagesRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
        fetchServices();
      } catch (err) {
        messagesRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xóa thất bại!' });
      } finally {
        setServiceLoading(false);
      }
    }
  };
  const handleDialogSubmit = async (data: Partial<Service>) => {
    setServiceLoading(true);
    try {
      if (editingService) {
        const id = String(editingService._id || editingService.service_id);
        await editService(id, data);
        messagesRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!' });
      } else {
        await addService(data);
        messagesRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới thành công!' });
      }
      setServiceDialogVisible(false);
      fetchServices();
    } catch (err) {
      messagesRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Lưu thất bại!' });
    } finally {
      setServiceLoading(false);
    }
  };

  // CRUD Price
  const handleAddPrice = () => {
    setEditingPrice(null);
    setPriceDialogVisible(true);
  };
  const handleEditPrice = (price: ServicePrice) => {
    setEditingPrice(price);
    setPriceDialogVisible(true);
  };
  const handleDeletePrice = (price: ServicePrice) => {
    confirmDialog({
      message: 'Bạn có chắc muốn xóa giá dịch vụ này?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Xóa',
      rejectLabel: 'Hủy',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        setPriceLoading(true);
        try {
          const id = price._id || price.price_id;
          await deletePrice(id);
          messagesRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
          fetchPrices();
        } catch (err) {
          messagesRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xóa thất bại!' });
        } finally {
          setPriceLoading(false);
        }
      },
    });
  };
  const handleDialogSubmitPrice = async (data: Partial<ServicePrice>) => {
    setPriceLoading(true);
    try {
      if (editingPrice) {
        const id = String(editingPrice._id || editingPrice.price_id);
        await editPrice(id, data);
        messagesRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!' });
      } else {
        await addPrice(data);
        messagesRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới thành công!' });
      }
      setPriceDialogVisible(false);
      fetchPrices();
    } catch (err) {
      messagesRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Lưu thất bại!' });
    } finally {
      setPriceLoading(false);
    }
  };

  // CRUD Feature
  const handleAddFeature = () => {
    setEditingFeature(null);
    setFeatureDialogVisible(true);
  };
  const handleEditFeature = (feature: ServiceFeature) => {
    setEditingFeature(feature);
    setFeatureDialogVisible(true);
  };
  const handleDeleteFeature = async (feature: ServiceFeature) => {
    if (window.confirm('Bạn có chắc muốn xóa đặc điểm này?')) {
      setFeatureLoading(true);
      try {
        await deleteFeature(feature.feature_id);
        messagesRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công!' });
        fetchFeatures();
      } catch (err) {
        messagesRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Xóa thất bại!' });
      } finally {
        setFeatureLoading(false);
      }
    }
  };
  const handleDialogSubmitFeature = async (data: Partial<ServiceFeature>) => {
    setFeatureLoading(true);
    try {
      if (editingFeature) {
        await editFeature(editingFeature.feature_id, data);
        messagesRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!' });
      } else {
        await addFeature(data);
        messagesRef.current?.show({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới thành công!' });
      }
      setFeatureDialogVisible(false);
      fetchFeatures();
    } catch (err) {
      messagesRef.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Lưu thất bại!' });
    } finally {
      setFeatureLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, minWidth: 350 }}>
        <Messages ref={messagesRef} />
        <ConfirmDialog />
      </div>
      {serviceLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,0.5)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ProgressSpinner style={{ width: 70, height: 70 }} strokeWidth="4" />
        </div>
      )}
      {priceLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,0.5)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ProgressSpinner style={{ width: 70, height: 70 }} strokeWidth="4" />
        </div>
      )}
      {featureLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,0.5)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ProgressSpinner style={{ width: 70, height: 70 }} strokeWidth="4" />
        </div>
      )}
      <TabView>
        <TabPanel header="Dịch vụ">
          <ServiceTable
            services={services}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <ServiceDialog
            visible={serviceDialogVisible}
            onHide={() => setServiceDialogVisible(false)}
            onSubmit={handleDialogSubmit}
            service={editingService}
            loading={serviceLoading}
          />
        </TabPanel>
        <TabPanel header="Giá dịch vụ">
          <PriceTable
            prices={prices}
            onAdd={handleAddPrice}
            onEdit={handleEditPrice}
            onDelete={handleDeletePrice}
            services={services}
          />
          <PriceDialog
            visible={priceDialogVisible}
            onHide={() => setPriceDialogVisible(false)}
            onSubmit={handleDialogSubmitPrice}
            price={editingPrice}
            loading={priceLoading}
            services={services}
          />
        </TabPanel>
        <TabPanel header="Đặc điểm">
          <FeatureTable
            features={features}
            onAdd={handleAddFeature}
            onEdit={handleEditFeature}
            onDelete={handleDeleteFeature}
            prices={prices}
          />
          <FeatureDialog
            visible={featureDialogVisible}
            onHide={() => setFeatureDialogVisible(false)}
            onSubmit={handleDialogSubmitFeature}
            feature={editingFeature}
            loading={featureLoading}
            prices={prices}
          />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default ServicesPage; 