"use client"
import Select from 'react-select'

const months = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' },
];

const MonthDropdownSelect = () =>{    
    const today = new Date().getMonth();
    const defaultMonth = months.find(m => m.value === today);
    return(           
        <div className="bs-select">                
            <Select                 
                options={months}   
                defaultValue={defaultMonth}                    
                className='custom-react-select' 
                isSearchable={false}                    
            />                
        </div>           
    )
}
export default MonthDropdownSelect;