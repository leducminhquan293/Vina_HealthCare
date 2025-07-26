import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Search, Plus, Edit, Trash2, User, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MedicalStaffWithTranslations } from '../types/medical-staff';
import { MedicalStaffForm } from './MedicalStaffForm';
import { mockMedicalStaff } from '../data/mockData';

export const MedicalStaffTable: React.FC = () => {
  const { translations, currentLanguage } = useLanguage();
  const [staffList, setStaffList] = useState<MedicalStaffWithTranslations[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<MedicalStaffWithTranslations[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<MedicalStaffWithTranslations | undefined>();
  const [showForm, setShowForm] = useState(false);
  const toastRef = React.useRef<Toast>(null);

  useEffect(() => {
    fetch('http://localhost:3001/medical-staff-profiles')
      .then(res => res.json())
      .then(data => {
        setStaffList(data);
        setFilteredStaff(data);
      });
  }, []);

  useEffect(() => {
    if (!globalFilter) {
      setFilteredStaff(staffList);
    } else {
      const filtered = staffList.filter(staff => {
        const nameMatch = staff.name?.toLowerCase().includes(globalFilter.toLowerCase());
        const translation = staff.translations.find(t => t.language === currentLanguage);
        const specializationMatch = translation?.specialization.toLowerCase().includes(globalFilter.toLowerCase());
        return nameMatch || specializationMatch;
      });
      setFilteredStaff(filtered);
    }
  }, [globalFilter, staffList, currentLanguage]);

  const handleAdd = () => {
    setSelectedStaff(undefined);
    setShowForm(true);
  };

  const handleEdit = (staff: MedicalStaffWithTranslations) => {
    setSelectedStaff(staff);
    setShowForm(true);
  };

  const handleDelete = (staff: MedicalStaffWithTranslations) => {
    confirmDialog({
      message: translations.confirmDelete,
      header: translations.confirm,
      icon: <AlertTriangle size={24} color="#f59e0b" />,
      accept: () => {
        fetch(`http://localhost:3001/medical-staff-profiles/${staff.profile_id}`, { method: 'DELETE' })
          .then(() => {
            fetch('http://localhost:3001/medical-staff-profiles')
              .then(res => res.json())
              .then(data => {
                setStaffList(data);
                setFilteredStaff(data);
                toastRef.current?.show({
                  severity: 'success',
                  summary: translations.success,
                  detail: translations.deleteSuccess,
                  life: 3000
                });
              });
          });
      }
    });
  };

  const handleSave = (staff: MedicalStaffWithTranslations) => {
    // Sau khi thêm/sửa, reload lại danh sách từ API
    fetch('http://localhost:3001/medical-staff-profiles')
      .then(res => res.json())
      .then(data => {
        setStaffList(data);
        setFilteredStaff(data);
        toastRef.current?.show({
          severity: 'success',
          summary: translations.success,
          detail: selectedStaff ? translations.updateSuccess : translations.addSuccess,
          life: 3000
        });
      });
  };

  const imageBodyTemplate = (rowData: MedicalStaffWithTranslations) => {
    return (
      <Avatar
        image={rowData.profile_image}
        icon={<User size={24} />}
        size="large"
        shape="circle"
      />
    );
  };

  const nameBodyTemplate = (rowData: MedicalStaffWithTranslations) => {
    return (
      <div>
        <div style={{ fontWeight: 'bold' }}>{rowData.name}</div>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{rowData.email}</div>
      </div>
    );
  };

  const specializationBodyTemplate = (rowData: MedicalStaffWithTranslations) => {
    const translation = rowData.translations.find(t => t.language === currentLanguage);
    return (
      <Tag value={translation?.specialization} className="p-mr-2" />
    );
  };

  const experienceBodyTemplate = (rowData: MedicalStaffWithTranslations) => {
    return `${rowData.experience_years} ${currentLanguage === 'vi' ? 'năm' : 'years'}`;
  };

  const dateBodyTemplate = (rowData: MedicalStaffWithTranslations) => {
    return new Date(rowData.created_at).toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US');
  };

  const statusBodyTemplate = (rowData: MedicalStaffWithTranslations) => {
    return (
      <Tag
        value={rowData.status === 'active' ? (currentLanguage === 'vi' ? 'Hiệu lực' : 'Active') : (currentLanguage === 'vi' ? 'Hết hiệu lực' : 'Inactive')}
        severity={rowData.status === 'active' ? 'success' : 'danger'}
        className="p-mr-2"
      />
    );
  };

  const actionBodyTemplate = (rowData: MedicalStaffWithTranslations) => {
    return (
      <div className="p-d-flex">
        <Button
          icon={<Edit size={16} />}
          className="p-button-rounded p-button-text p-mr-2"
          onClick={() => handleEdit(rowData)}
          tooltip={translations.edit}
        />
        <Button
          icon={<Trash2 size={16} />}
          className="p-button-rounded p-button-text p-button-danger"
          onClick={() => handleDelete(rowData)}
          tooltip={translations.delete}
        />
      </div>
    );
  };

  const header = (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <div>
        <h3 style={{ margin: 0, color: '#1e293b' }}>{translations.title}</h3>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280',
              zIndex: 1
            }}
          />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={translations.searchPlaceholder}
            style={{ paddingLeft: '2.5rem', width: '220px' }}
          />
        </div>
        <Button
          label={translations.addNew}
          icon={<Plus size={16} />}
          onClick={handleAdd}
          style={{ whiteSpace: 'nowrap' }}
        />
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toastRef} />
      <ConfirmDialog />

      <DataTable
        value={filteredStaff}
        header={header}
        responsiveLayout="scroll"
        stripedRows
        emptyMessage={translations.noDataFound}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
      >
        <Column
          field="profile_image"
          header=""
          body={imageBodyTemplate}
          style={{ width: '5rem' }}
        />
        <Column
          field="name"
          header={translations.name}
          body={nameBodyTemplate}
          sortable
        />
        <Column
          field="specialization"
          header={translations.specialization}
          body={specializationBodyTemplate}
          sortable
        />
        <Column
          field="experience_years"
          header={translations.experienceYears}
          body={experienceBodyTemplate}
          sortable
        />
        <Column
          field="license_number"
          header={translations.licenseNumber}
          sortable
        />
        <Column
          field="status"
          header={currentLanguage === 'vi' ? 'Trạng thái' : 'Status'}
          body={statusBodyTemplate}
          sortable
        />
        <Column
          field="created_at"
          header={translations.createdAt}
          body={dateBodyTemplate}
          sortable
        />
        <Column
          body={actionBodyTemplate}
          header={translations.actions}
          style={{ width: '8rem' }}
        />
      </DataTable>

      <MedicalStaffForm
        visible={showForm}
        onHide={() => setShowForm(false)}
        staff={selectedStaff}
        onSave={handleSave}
      />
    </>
  );
};