import { Progress, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export const ProgressGraph = ({ title, progressPercent, totalValue, currentValue }) => {
  const formatValue = () => (
    <div>
      <p style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: 0 }}>{currentValue}</p>
      <p style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.45)', marginBottom: 0 }}>
        out of {totalValue}
      </p>
    </div>
  );

  return (
    <div className='progress-item'>
      <Title
        level={5}
        style={{ fontWeight: 'bold' }}>
        {title}
      </Title>
      <Progress
        type='circle'
        percent={progressPercent}
        strokeColor='#36A2EB'
        trailColor='#D3D3D3'
        strokeLinecap='square'
        format={formatValue}
      />
    </div>
  );
};
