"use client"
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });

const DrName = [	
	{value:"one", label:"Doctor Name"},
	{value:"two", label:"Nashid Martines"},
	{value:"three", label:"Kenneth Fong"},	
];

const NameSelect = () => {
    return(
        <div className="form-floating floating-outline input-light">
            <Select options={DrName} defaultValue={DrName[0]} className='custom-react-select2' isSearchable={false}/>
        </div>
    )
}
export default NameSelect;