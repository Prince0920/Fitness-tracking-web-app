import { Button, DatePicker } from 'antd';
import React, { useState } from 'react';
import ExerciseTrackingGraph from '../graphs/ExerciseTrackingGraph';
import './ExerciseTrackingCard.css';

const { RangePicker } = DatePicker;

const ExerciseTrackingCard = () => {
  const [dateRange, setDateRange] = useState([]);

  const handleDateChange = dates => {
    setDateRange(dates);
  };

  const handleSubmit = () => {
    // Perform any desired actions with the selected date range
    console.log('Date Range:', dateRange);
  };

  return (
    <div className='card card-primary card-outline'>
      <div className='card-body'>
        <h5
          className='card-title'
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#CC5500',
          }}>
          Exercise Tracking
        </h5>
        <div className='date-range-container'>
          <RangePicker onChange={handleDateChange} />
          <Button
            type='primary'
            onClick={handleSubmit}
            style={{ marginLeft: '1rem' }}>
            Select Date Range
          </Button>
        </div>
        <ExerciseTrackingGraph />
      </div>
    </div>
  );
};

export default ExerciseTrackingCard;
