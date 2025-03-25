import React from 'react';
import DynamicList from "./watchlist";
import Calendar from './Calendar';
import ScheduledNotification from './NotifHandler';
import TimeTable from './TimeTable';

import './TimeTable.css';

const SchedulePage = () => {
    return (
      <div className="schedule-container">
        <h2>Schedule</h2>
        <ScheduledNotification />
        <Calendar />
        <TimeTable />
        <DynamicList />
      </div>
    );
  };
  
  export default SchedulePage;
