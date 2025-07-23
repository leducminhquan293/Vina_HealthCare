import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ServiceFeature } from './types';
import { ServicePrice } from './types';
import 'primeflex/primeflex.css';

interface FeatureTableProps {
  features: ServiceFeature[];
  onAdd: () => void;
  onEdit: (feature: ServiceFeature) => void;
  onDelete: (feature: ServiceFeature) => void;
  prices?: ServicePrice[];
}

const FeatureTable: React.FC<FeatureTableProps> = ({ features, onAdd, onEdit, onDelete, prices }) => {
  const getPriceDescription = (price_id: number | string) => {
    const price = prices?.find(p => String(p.price_id) === String(price_id) || String(p._id) === String(price_id));
    return price ? price.description : price_id;
  };
  const rowGroupHeaderTemplate = (data: ServiceFeature) => {
    return (
      <span style={{ fontWeight: 'bold' }}>{getPriceDescription(data.price_id)}</span>
    );
  };
  return (
    <div className="card">
      <div className="flex justify-content-end mb-3">
        <Button icon="pi pi-plus" label="Thêm mới" className="p-button-primary" onClick={onAdd} />
      </div>
      <DataTable value={features} responsiveLayout="scroll" rowGroupMode="subheader" groupRowsBy="price_id" rowGroupHeaderTemplate={rowGroupHeaderTemplate} sortMode="single" sortField="price_id" sortOrder={1} >
        <Column field="_id" header="ID" style={{ width: '60px' }} />
        <Column field="price_id" header="Mô tả giá dịch vụ" body={rowData => getPriceDescription(rowData.price_id)} />
        <Column field="name" header="Tên tính năng (VI)" />
        <Column field="name_en" header="Feature Name (EN)" />
        <Column field="description" header="Mô tả (VI)" />
        <Column field="description_en" header="Description (EN)" />
        <Column field="is_active" header="Kích hoạt" body={rowData => rowData.is_active ? '✔️' : ''} />
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

export default FeatureTable; 