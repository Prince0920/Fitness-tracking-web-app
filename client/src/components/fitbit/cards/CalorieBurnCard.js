import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import CalorieBurnGraph from '../graphs/CalorieBurnGraph';
import './CalorieBurnCard.css'

const { RangePicker } = DatePicker;

const CalorieBurnCard = () => {
  const [dateRange, setDateRange] = useState([]);

  const handleDateChange = dates => {
    setDateRange(dates);
  };

  const handleSubmit = () => {
    // Perform any desired actions with the selected date range
    console.log('Date Range:', dateRange);
  };

  const data = [
    { date: '2023-06-01', calories: 500 },
    { date: '2023-06-02', calories: 600 },
    { date: '2023-06-03', calories: 700 },
    { date: '2023-06-04', calories: 500 },
    { date: '2023-06-05', calories: 600 },
    { date: '2023-06-06', calories: 700 },
    { date: '2023-06-07', calories: 700 },
    { date: '2023-06-08', calories: 500 },
    { date: '2023-06-09', calories: 600 },
    { date: '2023-06-10', calories: 700 },
    // Add more data points as needed
  ];

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
          Calorie Burn
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
        <CalorieBurnGraph data={data} />
      </div>
    </div>
  );
};

export default CalorieBurnCard;
