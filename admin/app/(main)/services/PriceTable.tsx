import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ServicePrice } from './types';
import { Service } from './types';
import 'primeflex/primeflex.css';

interface PriceTableProps {
  prices: ServicePrice[];
  onAdd: () => void;
  onEdit: (price: ServicePrice) => void;
  onDelete: (price: ServicePrice) => void;
  services?: Service[];
}

const PriceTable: React.FC<PriceTableProps> = ({ prices, onAdd, onEdit, onDelete, services }) => {
  const getServiceName = (service_id: number | string) => {
    const service = services?.find(s => String(s.service_id) === String(service_id) || String(s._id) === String(service_id));
    if (!service) return `Dịch vụ #${service_id}`;
    return (
      <>
        {service.icon && <i className={service.icon} style={{ marginRight: 8 }} />}
        {service.name}
      </>
    );
  };
  const rowGroupHeaderTemplate = (data: ServicePrice) => {
    return (
      <span style={{ fontWeight: 'bold' }}>{getServiceName(data.service_id)}</span>
    );
  };
  const formatPrice = (value: number) => {
    return value?.toLocaleString('vi-VN') + ' VNĐ';
  };
  return (
    <div className="card">
      <div className="flex justify-content-end mb-3">
        <Button icon="pi pi-plus" label="Thêm mới" className="p-button-primary" onClick={onAdd} />
      </div>
      <DataTable value={prices} responsiveLayout="scroll" rowGroupMode="subheader" groupRowsBy="service_id" rowGroupHeaderTemplate={rowGroupHeaderTemplate} sortMode="single" sortField="service_id" sortOrder={1} >
        <Column field="_id" header="ID" style={{ width: '180px' }} />
        <Column field="description" header="Mô tả (VI)" />
        <Column field="description_en" header="Mô tả (EN)" />
        <Column field="price" header="Giá" body={rowData => formatPrice(rowData.price)} />
        <Column field="is_popular" header="Nổi bật" body={rowData => rowData.is_popular ? '✔️' : ''} />
        <Column
          header="Thao tác"
          body={rowData => (
            <>
              <Button icon="pi pi-pencil" className="p-button-outlined p-button-secondary mr-2" onClick={() => onEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={() => onDelete(rowData)} />
            </>
          )}
          style={{ width: '120px' }}
        />
      </DataTable>
    </div>
  );
};

export default PriceTable; 