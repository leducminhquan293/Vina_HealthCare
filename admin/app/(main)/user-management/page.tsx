"use client";

import React from 'react';
import UserManagementTable from './UserManagementTable';

const UserManagementPage: React.FC = () => {
  return (
    <div className="grid">
      <div className="col-12">
        <UserManagementTable />
      </div>
    </div>
  );
};

export default UserManagementPage; 