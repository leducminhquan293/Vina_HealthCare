import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { User } from './types';
import { getUsers, deleteUser } from './api';
import UserModal from './UserModal';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

const UserManagementTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedUser, setSelectedUser] = useState<User | undefined>();
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const toast = useRef<Toast>(null);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsers();
            console.log('Loaded users data:', data);
            setUsers(data);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleAddUser = () => {
        setModalMode('add');
        setSelectedUser(undefined);
        setModalVisible(true);
    };

    const handleEditUser = (user: User) => {
        console.log('Edit user clicked:', user);
        console.log('User ID for edit:', user.user_id);
        setModalMode('edit');
        setSelectedUser(user);
        setModalVisible(true);
    };

    const handleDeleteUser = (user: User) => {
        setUserToDelete(user);
        setDeleteDialogVisible(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        try {
            await deleteUser(userToDelete.user_id);
            toast.current?.show({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Xóa người dùng thành công',
                life: 3000
            });
            loadUsers(); // Reload data
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Không thể xóa người dùng',
                life: 3000
            });
        } finally {
            setDeleteDialogVisible(false);
            setUserToDelete(null);
        }
    };

    const handleModalSuccess = () => {
        loadUsers(); // Reload data after add/edit
    };

    const handleModalHide = () => {
        setModalVisible(false);
        setSelectedUser(undefined);
    };

    const avatarBodyTemplate = (rowData: User) => {
        const avatarSrc = rowData.avatar || '/avatar-default.jpg';
        return (
            <img
                src={avatarSrc}
                alt="Avatar"
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                }}
                onError={(e) => {
                    e.currentTarget.src = '/avatar-default.jpg';
                }}
            />
        );
    };

    const actionBodyTemplate = (rowData: User) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon="pi pi-pencil"
                    severity="secondary"
                    outlined
                    onClick={() => handleEditUser(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    outlined
                    onClick={() => handleDeleteUser(rowData)}
                />
            </div>
        );
    };

    const dateBodyTemplate = (rowData: User) => {
        if (!rowData.date_of_birth) return '-';
        return new Date(rowData.date_of_birth).toLocaleDateString('vi-VN');
    };

    const typeBodyTemplate = (rowData: User) => {
        return rowData.type === 'vip' ? 'VIP' : 'Normal';
    };

    return (
        <div className="card">
            <Toast ref={toast} />

            {/* Header with Add Button */}
            <div className="flex justify-content-between align-items-center mb-4">
                <h2>Quản lý người dùng</h2>
                <Button
                    label="Thêm mới"
                    icon="pi pi-plus"
                    onClick={handleAddUser}
                />
            </div>

            {/* DataTable */}
            <DataTable
                value={users}
                loading={loading}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                tableStyle={{ minWidth: '50rem' }}
                emptyMessage="Không có dữ liệu"
            >
                <Column field="user_id" header="ID" sortable style={{ width: '80px' }} />
                <Column field="full_name" header="Tên đầy đủ" sortable />
                <Column field="email" header="Email" sortable />
                <Column field="phone" header="Số điện thoại" sortable />
                <Column field="gender" header="Giới tính" sortable />
                <Column field="date_of_birth" header="Ngày sinh" sortable />
                <Column field="type" header="Loại người dùng" body={typeBodyTemplate} sortable />
                <Column field="role" header="Vai trò" sortable />
                <Column field="avatar" header="Ảnh đại diện" body={avatarBodyTemplate} />
                <Column body={actionBodyTemplate} style={{ minWidth: '180px' }} />
            </DataTable>

            {/* Modal */}
            <UserModal
                visible={modalVisible}
                onHide={handleModalHide}
                user={selectedUser}
                mode={modalMode}
                onSuccess={handleModalSuccess}
            />

            {/* Confirm Delete Dialog */}
            <ConfirmDeleteDialog
                visible={deleteDialogVisible}
                onHide={() => setDeleteDialogVisible(false)}
                onConfirm={confirmDelete}
                userName={userToDelete?.full_name || ''}
            />
        </div>
    );
};

export default UserManagementTable; 