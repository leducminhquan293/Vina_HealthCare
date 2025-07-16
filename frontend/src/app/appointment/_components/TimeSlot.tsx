import { Fragment } from "react"

const timeSlots = [
    "9:00 AM - 10:30 AM", "10:30 AM - 12:00 PM",
    "11:00 AM - 12:30 PM", "11:30 AM - 1:00 PM",
    "12:00 PM - 1:30 PM", "12:30 PM - 2:00 PM",
    "1:00 PM - 2:30 PM", "1:30 PM - 3:00 PM",
    "2:00 PM - 3:30 PM", "2:30 PM - 4:00 PM",
    "3:00 PM - 4:30 PM", "3:30 PM - 5:00 PM"
];

const TimeSlot = () =>{
    return(
        <Fragment>
            <div id="slots-container" className="slots-grid">
                {timeSlots.map((time, i)=>(
                    <div className="slot" key={i}>{time}</div>
                ))}
            </div>	
        </Fragment>
    )
}
export default TimeSlot;