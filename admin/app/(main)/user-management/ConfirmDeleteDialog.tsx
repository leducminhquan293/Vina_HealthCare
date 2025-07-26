import React from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { ConfirmDeleteDialogProps } from './types';

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
    visible,
    onHide,
    onConfirm,
    userName
}) => {
    return (
        <ConfirmDialog
            visible={visible}
            onHide={onHide}
            message={`Bạn có chắc chắn muốn xóa người dùng "${userName}"?`}
            header="Xác nhận xóa"
            icon="pi pi-exclamation-triangle"
            acceptLabel="Đồng ý"
            rejectLabel="Hủy bỏ"
            accept={onConfirm}
            reject={onHide}
        />
    );
};

export default ConfirmDeleteDialog; 