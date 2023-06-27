import React, { useState } from 'react';
import { Progress, Card, Typography, Row, Col, Divider, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LifetimeStatisticsCard = ({ caloriesBurned, totalSteps, distanceTraveled, activeScore }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Lifetime');

  const handleMenuClick = ({ key }) => {
    setSelectedPeriod(key);
    // Handle menu click here
    console.log('Selected:', key);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      selectedKeys={[selectedPeriod]}>
      <Menu.Item key='Lifetime'>Lifetime</Menu.Item>
    </Menu>
  );

  return (
    <Card className='card card-primary card-outline'>
      <div className='card-body'>
        <Row
          justify='space-between'
          align='middle'>
          <Col>
            <Title
              level={4}
              style={{ color: '#CC5500' }}>
              Total Status
            </Title>
          </Col>
          <Col>
            <Dropdown
              overlay={menu}
              placement='bottomRight'>
              <a
                href='#!'
                className='ant-dropdown-link'
                onClick={e => e.preventDefault()}>
                {selectedPeriod} <DownOutlined />
              </a>
            </Dropdown>
          </Col>
        </Row>
        <Divider />
        <div className='card-text'>
          <Row
            gutter={[16, 16]}
            justify='space-between'>
            <Col
              xs={24}
              sm={12}
              md={6}>
              <div className='progress-item'>
                <Title
                  level={5}
                  style={{ fontWeight: 'bold' }}>
                  Calories Burned
                </Title>
                <Progress
                  type='circle'
                  percent={caloriesBurned}
                  strokeColor='#FF6384'
                  trailColor='#D3D3D3'
                  strokeLinecap='square'
                  format={() => `${caloriesBurned}\nkcal`}
                />
              </div>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={6}>
              <div className='progress-item'>
                <Title
                  level={5}
                  style={{ fontWeight: 'bold' }}>
                  Total Steps
                </Title>
                <Progress
                  type='circle'
                  percent={totalSteps}
                  strokeColor='#36A2EB'
                  trailColor='#D3D3D3'
                  strokeLinecap='square'
                  format={() => `${totalSteps}\nsteps`}
                />
              </div>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={6}>
              <div className='progress-item'>
                <Title
                  level={5}
                  style={{ fontWeight: 'bold' }}>
                  Distance Traveled
                </Title>
                <Progress
                  type='circle'
                  percent={distanceTraveled}
                  strokeColor='#FFCE56'
                  trailColor='#D3D3D3'
                  strokeLinecap='square'
                  format={() => `${distanceTraveled}\nkm`}
                />
              </div>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={6}>
              <div className='progress-item'>
                <Title
                  level={5}
                  style={{ fontWeight: 'bold' }}>
                  Active Score
                </Title>
                <Progress
                  type='circle'
                  percent={activeScore}
                  strokeColor='#00C851'
                  trailColor='#D3D3D3'
                  strokeLinecap='square'
                  format={() => `${activeScore}`}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default LifetimeStatisticsCard;
