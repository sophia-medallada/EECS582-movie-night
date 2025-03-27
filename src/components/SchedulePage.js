import React, { useState } from 'react';
import DynamicList from "./watchlist";
import Calendar from './Calendar';
import ScheduledNotification from './NotifHandler';
import TimeTable from './TimeTable';
import '../styles/TimeTable.css';

const SchedulePage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // default is today
  
    return (
      <div className="schedule-container">
        <h2>Schedule</h2>
        <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <TimeTable selectedDate={selectedDate} />
      </div>
    );
  };
  
  export default SchedulePage;
