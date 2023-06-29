import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const GraphTitle = ({ title }) => {
  return (
    <Title
      level={4}
      style={{ color: '#CC5500', marginBottom: '1rem', marginTop: '1rem' }}>
      {title}
    </Title>
  );
};

export default GraphTitle;
