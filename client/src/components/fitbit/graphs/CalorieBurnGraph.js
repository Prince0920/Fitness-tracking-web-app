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

const CalorieBurnGraph = ({ data }) => {
  return (
    <ResponsiveContainer
      width='100%'
      height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
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
          type='monotone'
          dataKey='calories'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CalorieBurnGraph;
