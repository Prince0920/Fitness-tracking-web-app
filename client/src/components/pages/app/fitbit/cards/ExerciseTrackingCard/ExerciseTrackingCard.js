import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getActivityTimeseriesByDateRange } from '../../../api/API';
import ExerciseTrackingGraph from '../../../pages/app/fitbit/graphs/ExerciseTrackingGraph';
import './ExerciseTrackingCard.css';
import GraphTitle from '../../../reusable/title/GraphTitle';

const ExerciseTrackingCard = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'days'));
  const [endDate, setEndDate] = useState(dayjs());
  const data = [
    { date: '2023-06-01', caloriesBurned: 250, stepCount: 190 },
    { date: '2023-06-02', caloriesBurned: 350, stepCount: 150 },
    { date: '2023-06-03', caloriesBurned: 400, stepCount: 500 },
    { date: '2023-06-04', caloriesBurned: 200, stepCount: 190 },
    { date: '2023-06-05', caloriesBurned: 550, stepCount: 150 },
    { date: '2023-06-06', caloriesBurned: 50, stepCount: 500 },
    // Add more data points as needed
  ];
  const [activityData, setActivityData] = useState([]);

  const formatDate = date => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  const fetchActivityData = async (activity, formattedStartDate, formattedEndDate) => {
    const resp = await getActivityTimeseriesByDateRange(
      localStorage.getItem('token'),
      activity,
      formattedStartDate,
      formattedEndDate
    );
    if (resp.status === 200) {
      console.log('getActivityTimeseriesByDateRange', resp.data);
      return resp.data[`activities-tracker-${activity}`];
    } else {
      resp.status === 400 ? toast(resp.data.message) : toast('Something Went Wrong!');
    }
  };

  const combineActivityData = async () => {
    const stepsData = await fetchActivityData('steps', formatDate(startDate), formatDate(endDate));
    const caloriesData = await fetchActivityData(
      'calories',
      formatDate(startDate),
      formatDate(endDate)
    );
    const combinedArray = [];
    const dataMap = new Map();

    // Check if stepsData is defined and not empty
    if (stepsData && stepsData.length) {
      stepsData.forEach(({ dateTime, value }) => {
        if (!dataMap.has(dateTime)) {
          dataMap.set(dateTime, { date: dateTime });
        }
        dataMap.get(dateTime).stepCount = value;
      });
    }

    // Check if caloriesData is defined and not empty
    if (caloriesData && caloriesData.length) {
      caloriesData.forEach(({ dateTime, value }) => {
        if (!dataMap.has(dateTime)) {
          dataMap.set(dateTime, { date: dateTime });
        }
        dataMap.get(dateTime).caloriesBurned = value;
      });
    }

    // Convert the map values to an array
    dataMap.forEach(value => {
      combinedArray.push(value);
    });

    return combinedArray;
  };

  // Getting data
  // useEffect(() => {
  //   const fetch = async () => {
  //     const _data = await combineActivityData();
  //     setActivityData(_data);
  //   };

  //   fetch();
  // }, []);

  const handleSubmit = async () => {
    if (startDate && endDate) {
      const _data = await combineActivityData();
      setActivityData(_data);
    } else {
      toast('Please select both start and end dates.');
    }
  };

  console.log('activityData', activityData);
  return (
    <>
      <GraphTitle title={'Exercise Tracking'} />
      <div className='card card-primary card-outline'>
        <div className='card-body'>
          <div className='date-range-container'>
            <DatePicker
              value={startDate}
              onChange={date => setStartDate(date)}
            />
            <DatePicker
              value={endDate}
              onChange={date => setEndDate(date)}
            />
            <Button
              type='primary'
              onClick={handleSubmit}
              style={{ marginLeft: '1rem' }}>
              Select Date Range
            </Button>
          </div>
          <ExerciseTrackingGraph data={data} />
        </div>
      </div>
    </>
  );
};

export default ExerciseTrackingCard;
