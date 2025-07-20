'use client'

import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { MedicalStaffTable } from './components/MedicalStaffTable';

// Import only core PrimeReact CSS without theme fonts
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';

export default function App() {
  return (
    <LanguageProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
          <Header />
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <MedicalStaffTable />
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}