import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CalorieBurnGraph = ({ calorieData }) => {
  return (
    <BarChart width={500} height={300} data={calorieData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="calories" fill="#8884d8" />
    </BarChart>
  );
};

export default CalorieBurnGraph;
