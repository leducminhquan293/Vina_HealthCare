'use client';

import { useEffect, useState } from 'react';

const GoogleMap: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  return (
    isClient && (
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin"                         
            style={{ border: 0 , height: '100%', width: '100%'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        />     
    )
  );
};

export default GoogleMap;