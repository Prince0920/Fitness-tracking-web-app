import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ExerciseTrackingGraph = ({
  data = [
    { date: '2023-06-01', caloriesBurned: 250, minutesActive: 30 },
    { date: '2023-06-02', caloriesBurned: 350, minutesActive: 45 },
    { date: '2023-06-03', caloriesBurned: 400, minutesActive: 60 },
    // Add more data points as needed
  ],
}) => {
  return (
    <ResponsiveContainer
      width='100%'
      height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='caloriesBurned'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
        <Line
          type='monotone'
          dataKey='minutesActive'
          stroke='#82ca9d'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExerciseTrackingGraph;
