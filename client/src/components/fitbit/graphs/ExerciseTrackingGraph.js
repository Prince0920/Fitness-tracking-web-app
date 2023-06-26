import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
  
const ExerciseTrackingGraph = ({
  data = [
    { date: '2023-06-01', caloriesBurned: 250, stepCount: 190 },
    { date: '2023-06-02', caloriesBurned: 350, stepCount: 150 },
    { date: '2023-06-03', caloriesBurned: 400, stepCount: 500 },
    { date: '2023-06-04', caloriesBurned: 200, stepCount: 190 },
    { date: '2023-06-05', caloriesBurned: 550, stepCount: 150 },
    { date: '2023-06-06', caloriesBurned: 50, stepCount: 500 },
    // Add more data points as needed
  ],
}) => {
  return (
    <ResponsiveContainer
      width='100%'
      height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey='caloriesBurned'
          fill='#8884d8'
        />
        <Bar
          dataKey='stepCount'
          fill='#82ca9d'
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExerciseTrackingGraph;
