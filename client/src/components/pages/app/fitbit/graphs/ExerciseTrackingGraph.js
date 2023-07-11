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

const ExerciseTrackingGraph = ({ data }) => {
  return (
    <ResponsiveContainer
      width='100%'
      height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='date'
          interval={0}
          angle={-45}
          dy={15}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='linear'
          dataKey='caloriesBurned'
          stroke='#8884d8'
          strokeWidth={2}
          dot={{ stroke: '#8884d8', fill: '#8884d8', r: 4 }}
        />
        <Line
          type='linear'
          dataKey='stepCount'
          stroke='#82ca9d'
          strokeWidth={2}
          dot={{ stroke: '#82ca9d', fill: '#82ca9d', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExerciseTrackingGraph;
