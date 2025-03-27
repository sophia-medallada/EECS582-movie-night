import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScheduledNotification = () => {
  // State to store the scheduled time
  const [scheduledTime, setScheduledTime] = useState('');
  const [message, setMessage] = useState('Your Movie Starts Now!');
  
  // Function to schedule the notification
  const scheduleNotification = () => {
    if (!scheduledTime) return;
    
    const now = new Date();
    const targetTime = new Date();
    
    // Parse the time string (HH:MM)
    const [hours, minutes] = scheduledTime.split(':');
    targetTime.setHours(parseInt(hours, 10));
    targetTime.setMinutes(parseInt(minutes, 10));
    targetTime.setSeconds(0);
    
    // If the target time is in the past for today, do nothing
    if (targetTime <= now) {
      toast.warning('Please select a future time!');
      return;
    }
    
    // Calculate milliseconds until the target time
    const timeUntilNotification = targetTime.getTime() - now.getTime();
    
    // Schedule the notification
    toast.info(`Notification scheduled for ${scheduledTime}`);
    
    setTimeout(() => {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, timeUntilNotification);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Schedule Notification</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Notification Time:</label>
        <input 
          type="time" 
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Message:</label>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      
      <button 
        onClick={scheduleNotification}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Schedule
      </button>
      
      {/* Toast Container - this is where notifications will appear */}
      <ToastContainer />
    </div>
  );
};

export default ScheduledNotification;