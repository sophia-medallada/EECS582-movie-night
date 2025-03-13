// Authors: Sophia, Eli, Damian, Matthew and Abraham
// Date: 2/13/25
// Last Modified: 3/13/25
// Purpose: Controls behavior and logic for the calender portion of the application.
import React, { useState } from 'react';
import './calender.css';
import TimeTable from './TimeTable.js';

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('monthly'); // State for switching between monthly and weekly views

  const year = date.getFullYear();
  const month = date.getMonth();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate the monthly view
  const generateCalendar = () => {
    const dayone = new Date(year, month, 1).getDay();
    const lastdate = new Date(year, month + 1, 0).getDate();
    const dayend = new Date(year, month, lastdate).getDay();
    const monthlastdate = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month dates
    for (let i = dayone; i > 0; i--) {
      days.push(<li key={`p-${i}`} className="inactive">{monthlastdate - i + 1}</li>);
    }

    // Current month dates
    for (let i = 1; i <= lastdate; i++) {
      const isToday = i === new Date().getDate()
        && month === new Date().getMonth()
        && year === new Date().getFullYear();

      days.push(
        <li key={`c-${i}`} className={isToday ? "active" : ""}>{i}</li>
      );
    }

    // Next month dates
    for (let i = dayend; i < 6; i++) {
      days.push(<li key={`n-${i}`} className="inactive">{i - dayend + 1}</li>);
    }

    return days;
  };

  // Generate the weekly view (one week at a time)
  const generateWeeklyView = () => {
    const startOfWeek = date.getDate() - date.getDay(); // Calculate the start of the week (Sunday)
    const days = [];

    for (let i = startOfWeek; i < startOfWeek + 7; i++) {
      const currentDay = new Date(year, month, i);
      const isToday = currentDay.toDateString() === new Date().toDateString();
      
      days.push(
        <li key={i} className={isToday ? "active" : ""}>
          {currentDay.getDate()}
        </li>
      );
    }

    return days;
  };

  const goToPrev = () => {
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, prev.getDate()));
  };

  const goToNext = () => {
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, prev.getDate()));
  };

  const switchToWeekly = () => {
    setView('weekly');
  };

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
      <TimeTable />
    </div>
  );
}

export default Calendar;

