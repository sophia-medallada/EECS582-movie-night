// Authors: Sophia, Eli, Damian, Matthew and Abraham
// Date: 2/13/25
// Last Modified: 3/13/25
// Purpose: Controls behavior and logic for the calendar portion of the application.

import React, { useState } from 'react';
import './calender.css';
import TimeTable from './TimeTable.js';

function Calendar({ selectedDate, onDateChange }) {
  const [date, setDate] = useState(new Date()); // internal month/year control
  const [view, setView] = useState('monthly');
  //const [selectedDate, setSelectedDate] = useState(null); // for tracking clicked date

  const year = date.getFullYear(); //current year
  const month = date.getMonth(); //current month

  //all the months
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDateClick = (newDate) => {
    onDateChange(newDate); // tell parent component
  };

  // Generate the monthly view
  const generateCalendar = () => {
    const dayone = new Date(year, month, 1).getDay(); //day of the first week of month
    const lastdate = new Date(year, month + 1, 0).getDate(); //last date of month
    const dayend = new Date(year, month, lastdate).getDay(); //last day of the week
    const monthlastdate = new Date(year, month, 0).getDate(); //last date of previous month

    const days = [];

    // Previous month dates
    for (let i = dayone; i > 0; i--) {
      days.push(
        <li key={`p-${i}`} className="inactive">
          {monthlastdate - i + 1}
        </li>
      );
    }

    // Current month dates
    for (let i = 1; i <= lastdate; i++) {
      const thisDate = new Date(year, month, i);
      const isToday = thisDate.toDateString() === new Date().toDateString(); //checks if the day is today
      const isSelected = selectedDate && thisDate.toDateString() === selectedDate.toDateString(); //checks if the day is selected

      days.push(
        <li
          key={`c-${i}`}
          className={`${isToday ? "active" : ""} ${isSelected ? "selected" : ""}`} //adds class for active and selected dates
          onClick={() => handleDateClick(thisDate)}
        >
          {i}
        </li>
      );
    }

    // Next month dates
    for (let i = dayend; i < 6; i++) {
      days.push(
        <li key={`n-${i}`} className="inactive">
          {i - dayend + 1}
        </li>
      );
    }

    return days;
  };

  // Generate the weekly view
  const generateWeeklyView = () => {
    const startOfWeek = date.getDate() - date.getDay(); // Sunday start
    const days = [];

    //fills in the dates for the weekly view
    for (let i = startOfWeek; i < startOfWeek + 7; i++) {
      const currentDay = new Date(year, month, i);
      const isToday = currentDay.toDateString() === new Date().toDateString(); //checks if the day is today
      const isSelected = selectedDate && currentDay.toDateString() === selectedDate.toDateString(); // checks if the day is selected

      days.push(
        <li
          key={i}
          className={`${isToday ? "active" : ""} ${isSelected ? "selected" : ""}`}  //adds class for active and selected dates
          onClick={() => handleDateClick(currentDay)}
        >
          {currentDay.getDate()}
        </li>
      );
    }

    return days;
  };

  //goes to the previous month
  const goToPrev = () => {
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, prev.getDate()));
  };

  //goes to the next month
  const goToNext = () => {
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, prev.getDate()));
  };

  //goes to weekly view
  const switchToWeekly = () => {
    setView('weekly');
  };

  //goes to monthly view
  const switchToMonthly = () => {
    setView('monthly');
  };

  return (
    <div className="calendar">
      <header className="calendar-header">
        <span id="calendar-prev" onClick={goToPrev}>&lt;</span>
        <p className="calendar-current-date">{`${months[month]} ${year}`}</p>
        <span id="calendar-next" onClick={goToNext}>&gt;</span>
        <div>
          <button onClick={switchToMonthly}>Monthly View</button>
          <button onClick={switchToWeekly}>Weekly View</button>
        </div>
      </header>

      <div className="calendar-body">
        {view === 'monthly' ? (
          <>
            <ul className="calendar-weekdays">
              <li>Sun</li><li>Mon</li><li>Tue</li><li>Wed</li><li>Thu</li><li>Fri</li><li>Sat</li>
            </ul>
            <ul className="calendar-dates">
              {generateCalendar()}
            </ul>
          </>
        ) : (
          <>
            <ul className="calendar-weekdays">
              <li>Sun</li><li>Mon</li><li>Tue</li><li>Wed</li><li>Thu</li><li>Fri</li><li>Sat</li>
            </ul>
            <ul className="calendar-dates">
              {generateWeeklyView()}
            </ul>
          </>
        )}
      </div>

      {selectedDate && (
        <div className="selected-date-display">
          <p>Selected: {selectedDate.toDateString()}</p>
        </div>
      )}

    </div>
  );
}

export default Calendar;


