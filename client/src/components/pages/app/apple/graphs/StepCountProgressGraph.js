import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const StepCountProgressGraph = ({ targetSteps, currentSteps }) => {
  const data = [
    { name: 'Current Steps', value: currentSteps },
    { name: 'Remaining Steps', value: targetSteps - currentSteps },
  ];

  const COLORS = ['#82ca9d', '#c4c4c4']; // Green for current steps, light gray for remaining steps

  return (
    <ResponsiveContainer
      width='100%'
      height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey='value'
          innerRadius='50%'
          outerRadius='80%'
          fill='#82ca9d'
          label>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StepCountProgressGraph;
