import React from 'react';
import { Button } from 'primereact/button';
import { Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { currentLanguage, setCurrentLanguage, translations } = useLanguage();

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'vi' ? 'en' : 'vi');
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Heart size={32} color="#ef4444" style={{ marginRight: '0.75rem' }} />
        <div>
          <h1 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1e293b'
          }}>
            MedicalCare
          </h1>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          label={currentLanguage === 'vi' ? '��🇸 English' : '🇻🇳 Tiếng Việt'}
          className="p-button-outlined"
          onClick={toggleLanguage}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderColor: '#e2e8f0',
            color: '#64748b'
          }}
        />
      </div>
    </div>
  );
};