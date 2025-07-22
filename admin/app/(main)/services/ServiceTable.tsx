import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Service } from './types';
import 'primeflex/primeflex.css';
import { Tag } from 'primereact/tag';

interface ServiceTableProps {
  services: any[];
  onAdd: () => void;
  onEdit: (service: any) => void;
  onDelete: (service: any) => void;
}

// Chỉ hiển thị icon nếu đúng chuẩn PrimeIcons
const renderIcon = (rowData: any) => {
  if (rowData.icon && typeof rowData.icon === 'string' && rowData.icon.startsWith('pi ')) {
    return <i className={rowData.icon} style={{ fontSize: 18 }} />;
  }
  return <span>-</span>;
};

const renderValue = (value: any) => value ? value : '-';

const renderActiveBadge = (rowData: any) => {
  return rowData.is_active ? (
    <Tag value="Active" severity="success" />
  ) : (
    <Tag value="Inactive" severity="secondary" />
  );
};

const ServiceTable: React.FC<ServiceTableProps> = ({ services, onAdd, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="flex justify-content-end mb-3">
        <Button icon="pi pi-plus" className="p-button-outlined p-button-secondary" onClick={onAdd} />
      </div>
      <div className="mb-2" style={{ color: '#888', fontSize: 13 }}>
        <span>Nhập mã icon theo <a href="https://primereact.org/icons/" target="_blank" rel="noopener noreferrer">PrimeIcons</a>, ví dụ: <code>pi pi-home</code>, <code>pi pi-user</code>, <code>pi pi-cog</code>...</span>
      </div>
      <DataTable value={services} responsiveLayout="scroll">
        <Column field="_id" header="ID" style={{ width: '60px' }} body={rowData => renderValue(rowData._id)} />
        <Column field="icon" header="Icon" body={renderIcon} />
        <Column field="name" header="Tên dịch vụ" body={rowData => renderValue(rowData.name)} />
        <Column field="name_en" header="Service Name (EN)" body={rowData => renderValue(rowData.name_en)} />
        <Column field="description" header="Mô tả (VI)" body={rowData => renderValue(rowData.description)} />
        <Column field="description_en" header="Description (EN)" body={rowData => renderValue(rowData.description_en)} />
        <Column field="is_active" header="Kích hoạt" body={renderActiveBadge} />
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

export default ServiceTable; 