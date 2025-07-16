"use client"

import Select from 'react-select';

const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 3 }, (_, i) => {
        const year = currentYear + i;
        return { value: year, label: year.toString() };
    });
};

const yearOptions = getYearOptions();

const YearDropdownSelect = () =>{    
    const currentYear = new Date().getFullYear();
    const defaultYear = yearOptions.find(option => option.value === currentYear);

    return(        
        <div className="bs-select">
            <Select 
                options={yearOptions} 
                defaultValue={defaultYear} 
                isSearchable={false} className='custom-react-select'
            />
        </div>        
    )
}
export default YearDropdownSelect;