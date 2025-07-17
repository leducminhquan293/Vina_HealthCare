import { Dropdown } from 'primereact/dropdown';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languageOptions = [
    { 
      label: (
        <div className="flex items-center space-x-2">
          <span>🇻🇳</span>
          <span>Tiếng Việt</span>
        </div>
      ), 
      value: 'vi' 
    },
    { 
      label: (
        <div className="flex items-center space-x-2">
          <span>🇺🇸</span>
          <span>English</span>
        </div>
      ), 
      value: 'en' 
    }
  ];

  const selectedLanguage = languageOptions.find(opt => opt.value === language);

  return (
    <div className="flex items-center space-x-2">
      <i className="pi pi-globe text-muted-foreground"></i>
      <Dropdown
        value={selectedLanguage}
        options={languageOptions}
        onChange={(e) => setLanguage(e.value.value)}
        optionLabel="label"
        className="w-32"
        placeholder="Language"
      />
    </div>
  );
}