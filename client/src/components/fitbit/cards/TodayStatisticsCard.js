import React from 'react';
import { Progress, Card, Typography, Row, Col, Divider } from 'antd';

const { Title } = Typography;

const TodayStatisticsCard = () => {
  const totalSteps = 10000;
  const currentSteps = 6000;
  const stepProgressPercent = (currentSteps / totalSteps) * 100;

  const formatSteps = () => (
    <div>
      <p style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: 0 }}>{currentSteps}</p>
      <p style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.45)', marginBottom: 0 }}>
        out of {totalSteps}
      </p>
    </div>
  );

  const totalCalories = 2000;
  const burnedCalories = 1500;
  const calorieProgressPercent = (burnedCalories / totalCalories) * 100;

  const formatCalories = () => (
    <div>
      <p style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: 0 }}>{burnedCalories}</p>
      <p style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.45)', marginBottom: 0 }}>
        out of {totalCalories}
      </p>
    </div>
  );

  const totalDistance = 10;
  const traveledDistance = 6;
  const distanceProgressPercent = (traveledDistance / totalDistance) * 100;

  const formatDistance = () => (
    <div>
      <p style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: 0 }}>{traveledDistance}</p>
      <p style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.45)', marginBottom: 0 }}>
        out of {totalDistance}
      </p>
    </div>
  );

  return (
    <Card className='card card-primary card-outline'>
      <div className='card-body'>
        <Title
          level={4}
          style={{ color: '#CC5500' }}>
          Today Statistics
        </Title>
        <Divider />

        <Row
          justify='space-between'
          gutter={[16, 16]}>
          <Col>
            <div className='progress-item'>
              <Title
                level={5}
                style={{ fontWeight: 'bold' }}>
                Step Count
              </Title>
              <Progress
                type='circle'
                percent={stepProgressPercent}
                strokeColor='#36A2EB'
                trailColor='#D3D3D3'
                strokeLinecap='square'
                format={formatSteps}
              />
            </div>
          </Col>
          <Col>
            <div className='progress-item'>
              <Title
                level={5}
                style={{ fontWeight: 'bold' }}>
                Calories Burned
              </Title>
              <Progress
                type='circle'
                percent={calorieProgressPercent}
                strokeColor='#FF6384'
                trailColor='#D3D3D3'
                strokeLinecap='square'
                format={formatCalories}
              />
            </div>
          </Col>
          <Col>
            <div className='progress-item'>
              <Title
                level={5}
                style={{ fontWeight: 'bold' }}>
                Distance Traveled
              </Title>
              <Progress
                type='circle'
                percent={distanceProgressPercent}
                strokeColor='#FFCE56'
                trailColor='#D3D3D3'
                strokeLinecap='square'
                format={formatDistance}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default TodayStatisticsCard;
