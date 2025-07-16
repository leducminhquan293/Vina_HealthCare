"use client"
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });


const services = [	
	{value:"department", label:"Department"},
	{value:"angioplasty", label:"Angioplasty"},
	{value:"cardiology", label:"Cardiology"},
	{value:"dental", label:"Dental"},
	{value:"eye", label:"Eye Care"},
];

const DepartmentSelect = () =>{
    return(
        <div className="form-floating floating-outline input-light">
            <Select 
                options={services} 
                defaultValue={services[0]} 
                className='custom-react-select2' 
                isSearchable={false}
            />
        </div>
    )
}
export default DepartmentSelect;