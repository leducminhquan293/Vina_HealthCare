'use client'
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Search, Plus, Edit, Trash2, User, AlertTriangle, Filter, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { User as UserType } from '../types/user';
import { UserForm } from './UserForm';
import { UserService } from '../services/userService';

export const UserTable: React.FC = () => {
  const { translations, currentLanguage } = useLanguage();
  const [userList, setUserList] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const toastRef = React.useRef<Toast>(null);

  const roleFilterOptions = [
    { label: translations.allRoles, value: '' },
    { label: translations.patient, value: 'Patient' },
    { label: translations.doctor, value: 'Doctor' },
    { label: translations.nurse, value: 'Nurse' }
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const users = await UserService.getAllUsers();
      setUserList(users);
      setFilteredUsers(users);
    } catch (error) {
      console.error('Error loading users:', error);
      toastRef.current?.show({
        severity: 'error',
        summary: translations.error,
        detail: translations.loadUsersError || 'Error loading users',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = userList;

    // Filter by role
    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Filter by global search
    if (globalFilter) {
      filtered = filtered.filter(user => {
        const nameMatch = user.full_name.toLowerCase().includes(globalFilter.toLowerCase());
        const emailMatch = user.email?.toLowerCase().includes(globalFilter.toLowerCase());
        const roleMatch = getRoleLabel(user.role).toLowerCase().includes(globalFilter.toLowerCase());
        return nameMatch || emailMatch || roleMatch;
      });
    }

    setFilteredUsers(filtered);
  }, [globalFilter, roleFilter, userList, translations]);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'Patient': return translations.patient;
      case 'Doctor': return translations.doctor;
      case 'Nurse': return translations.nurse;
      default: return role;
    }
  };

  const getGenderLabel = (gender?: string) => {
    switch (gender) {
      case 'Male': return translations.male;
      case 'Female': return translations.female;
      case 'Other': return translations.other;
      default: return '';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Doctor': return 'info';
      case 'Nurse': return 'success';
      case 'Patient': return 'warning';
      default: return 'primary';
    }
  };

  const handleAdd = () => {
    setSelectedUser(undefined);
    setShowForm(true);
  };

  const handleEdit = (user: UserType) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = (user: UserType) => {
    confirmDialog({
      message: translations.confirmDeleteUser,
      header: translations.confirm,
      icon: <AlertTriangle size={24} color="#f59e0b" />,
      accept: async () => {
        try {
          // Use MongoDB _id if available, otherwise use user_id
          const userId = user._id || user.user_id.toString();
          await UserService.deleteUser(userId);
          await loadUsers(); // Reload the list
          toastRef.current?.show({
            severity: 'success',
            summary: translations.success,
            detail: translations.deleteUserSuccess,
            life: 3000
          });
        } catch (error) {
          console.error('Error deleting user:', error);
          toastRef.current?.show({
            severity: 'error',
            summary: translations.error,
            detail: translations.deleteUserError || 'Error deleting user',
            life: 3000
          });
        }
      }
    });
  };

  const handleSave = async (user: UserType) => {
    try {
      if (selectedUser) {
        // Update existing user
        const userId = user._id || user.user_id.toString();
        await UserService.updateUser(userId, {
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          gender: user.gender,
          date_of_birth: user.date_of_birth,
          address: user.address
        });
        toastRef.current?.show({
          severity: 'success',
          summary: translations.success,
          detail: translations.updateUserSuccess,
          life: 3000
        });
      } else {
        // Add new user
        await UserService.createUser({
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          gender: user.gender,
          date_of_birth: user.date_of_birth,
          address: user.address
        });
        toastRef.current?.show({
          severity: 'success',
          summary: translations.success,
          detail: translations.addUserSuccess,
          life: 3000
        });
      }
      await loadUsers(); // Reload the list
      setShowForm(false);
    } catch (error) {
      console.error('Error saving user:', error);
      toastRef.current?.show({
        severity: 'error',
        summary: translations.error,
        detail: translations.saveUserError || 'Error saving user',
        life: 3000
      });
    }
  };

  const avatarBodyTemplate = (rowData: UserType) => {
    return (
      <Avatar
        label={rowData.full_name.charAt(0).toUpperCase()}
        icon={<User size={20} />}
        size="large"
        shape="circle"
        style={{
          backgroundColor: '#3B82F6',
          color: 'white',
          width: '2.5rem',
          height: '2.5rem'
        }}
      />
    );
  };

  const nameBodyTemplate = (rowData: UserType) => {
    return (
      <div>
        <div style={{ fontWeight: '600', color: '#1e293b' }}>{rowData.full_name}</div>
        {rowData.email && (
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
            {rowData.email}
          </div>
        )}
      </div>
    );
  };

  const contactBodyTemplate = (rowData: UserType) => {
    return (
      <div>
        {rowData.phone && (
          <div style={{ fontSize: '0.875rem', color: '#374151' }}>{rowData.phone}</div>
        )}
        {rowData.gender && (
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>
            {getGenderLabel(rowData.gender)}
          </div>
        )}
      </div>
    );
  };

  const roleBodyTemplate = (rowData: UserType) => {
    return (
      <Tag
        value={getRoleLabel(rowData.role)}
        severity={getRoleColor(rowData.role)}
        style={{ fontSize: '0.75rem' }}
      />
    );
  };

  const ageBodyTemplate = (rowData: UserType) => {
    if (!rowData.date_of_birth) return '-';

    const birthDate = new Date(rowData.date_of_birth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return `${age} ${translations.years}`;
  };

  const dateBodyTemplate = (rowData: UserType) => {
    return new Date(rowData.created_at).toLocaleDateString(
      currentLanguage === 'vi' ? 'vi-VN' : 'en-US'
    );
  };

  const actionBodyTemplate = (rowData: UserType) => {
    return (
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <Button
          icon={<Edit size={14} />}
          className="p-button-rounded p-button-text"
          onClick={() => handleEdit(rowData)}
          tooltip={translations.edit}
          style={{ width: '2rem', height: '2rem' }}
        />
        <Button
          icon={<Trash2 size={14} />}
          className="p-button-rounded p-button-text p-button-danger"
          onClick={() => handleDelete(rowData)}
          tooltip={translations.delete}
          style={{ width: '2rem', height: '2rem' }}
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
        <h3 style={{ margin: 0, color: '#1e293b' }}>{translations.userInfo}</h3>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
          {currentLanguage === 'vi'
            ? `Tổng cộng ${filteredUsers.length} người dùng`
            : `Total ${filteredUsers.length} users`
          }
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative' }}>
          <Dropdown
            value={roleFilter}
            options={roleFilterOptions}
            onChange={(e) => setRoleFilter(e.value)}
            placeholder={translations.filterByRole}
            style={{ width: '160px' }}
          />
        </div>

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
            placeholder={translations.searchUserPlaceholder}
            style={{ paddingLeft: '2.5rem', width: '280px' }}
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
        value={filteredUsers}
        header={header}
        responsiveLayout="scroll"
        stripedRows
        loading={loading}
        emptyMessage={loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '2rem' }}>
            <Loader2 size={20} className="animate-spin" />
            <span>{translations.loading || 'Loading...'}</span>
          </div>
        ) : translations.noDataFound}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate={
          currentLanguage === 'vi'
            ? "Hiển thị {first} đến {last} của {totalRecords} bản ghi"
            : "Showing {first} to {last} of {totalRecords} entries"
        }
        style={{ marginTop: '1rem' }}
      >
        <Column
          field="avatar"
          header=""
          body={avatarBodyTemplate}
          style={{ width: '4rem', textAlign: 'center' }}
        />
        <Column
          field="full_name"
          header={translations.fullName}
          body={nameBodyTemplate}
          sortable
          style={{ minWidth: '200px' }}
        />
        <Column
          field="contact"
          header={translations.contact}
          body={contactBodyTemplate}
          style={{ minWidth: '150px' }}
        />
        <Column
          field="role"
          header={translations.role}
          body={roleBodyTemplate}
          sortable
          style={{ width: '120px' }}
        />
        <Column
          field="age"
          header={translations.age}
          body={ageBodyTemplate}
          style={{ width: '80px', textAlign: 'center' }}
        />
        <Column
          field="address"
          header={translations.address}
          style={{ maxWidth: '200px' }}
        />
        <Column
          field="created_at"
          header={translations.createdAt}
          body={dateBodyTemplate}
          sortable
          style={{ width: '120px' }}
        />
        <Column
          body={actionBodyTemplate}
          header={translations.actions}
          style={{ width: '100px', textAlign: 'center' }}
        />
      </DataTable>

      <UserForm
        visible={showForm}
        onHide={() => setShowForm(false)}
        user={selectedUser}
        onSave={handleSave}
      />
    </>
  );
};