"use client"
import { useState } from "react";
import TimeSlot from "./TimeSlot";
import MonthDropdownSelect from "./MonthDropdownSelect";
import YearDropdownSelect from "./YearDropdownSelect";

const CalendarData = () =>{
    const today = new Date();
    const [month, setMonth] = useState<number>(today.getMonth());
    const [year, setYear] = useState<number>(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const startBlank = firstDay === 0 ? 6 : firstDay - 1;        

    const handlePrevMonth = () => {
        if (month > 0) {
        setMonth(month - 1);
        } else {
        setMonth(11);
        setYear(year - 1);
        }
        setSelectedDay(null);
    };

    const handleNextMonth = () => {
        if (month < 11) {
            setMonth(month + 1);
        } else {
            setMonth(0);
            setYear(year + 1);
        }
        setSelectedDay(null);
    };
    return(
        <>
            <div className="appointment-wrapper">											
                <div className="controls">										
                    <MonthDropdownSelect />
                    <YearDropdownSelect />
                    <div className="control-button">
                        <button id="prev-month" onClick={handlePrevMonth}><i className="feather icon-chevron-left"></i></button>
                        <button id="next-month" onClick={handleNextMonth}><i className="feather icon-chevron-right"></i></button>
                    </div>
                </div>
            
                <div className="calendar-section">
                    <div className="calendar-info">
                        <h5 className="title">Europe/London</h5>
                        <div className="calendar">                                
                            <div className="days-header">
                                <div>Mon</div>
                                <div>Tue</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                                <div>Sun</div>                                
                            </div>                            
                            <div className="days-grid" id="calendar-days">
                                {Array.from({ length: startBlank }).map((_, i) => (
                                    <div key={`blank-${i}`} className="blank"></div>
                                ))}
                                {Array.from({ length: daysInMonth }, (_, i) => {
                                    const d = new Date(year, month, i + 1);
                                    const isSelected = selectedDay && d.toDateString() === selectedDay.toDateString();
                                    return (
                                        <div
                                            key={i}
                                            className={`day ${isSelected ? "selected" : ""}`}
                                            onClick={() => setSelectedDay(d)}
                                        >
                                            {i + 1}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="time-slots">
                        <h5 id="selected-date">
                            {/* Select a date */}
                            {selectedDay ? selectedDay.toDateString() : "Select a date"}
                        </h5>
                        <TimeSlot />										
                    </div>                    
                </div>
            </div>
        </>
    )
}
export default CalendarData;