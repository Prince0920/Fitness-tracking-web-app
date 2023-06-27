import { Card, Col, Divider, Progress, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getDailyActivitySummary } from '../../../../utils/API';

const { Title } = Typography;

const DailyGoalsCard = () => {
  const [summary, setSummary] = useState(null);
  const [goals, setGoals] = useState(null);

  const totalSteps = goals?.steps || 10000;
  const currentSteps = summary?.steps || 6000;
  const stepProgressPercent = (currentSteps / totalSteps) * 100;

  const formatSteps = () => (
    <div>
      <p style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: 0 }}>{currentSteps}</p>
      <p style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.45)', marginBottom: 0 }}>
        out of {totalSteps}
      </p>
    </div>
  );

  const totalCalories = goals?.caloriesOut || 2000;
  const burnedCalories = summary?.caloriesOut || 1500;
  const calorieProgressPercent = (burnedCalories / totalCalories) * 100;

  const formatCalories = () => (
    <div>
      <p style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: 0 }}>{burnedCalories}</p>
      <p style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.45)', marginBottom: 0 }}>
        out of {totalCalories}
      </p>
    </div>
  );

  const totalDistance = goals?.distance || 10;
  const traveledDistance = summary?.distances[0]?.distance || 6;
  const distanceProgressPercent = (traveledDistance / totalDistance) * 100;

  const formatDistance = () => (
    <div>
      <p style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: 0 }}>{traveledDistance}</p>
      <p style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.45)', marginBottom: 0 }}>
        out of {totalDistance}
      </p>
    </div>
  );

  // Fetching activity goals.
  useEffect(() => {
    const fetch = async () => {
      const resp = await getDailyActivitySummary(localStorage.getItem('token'));
      if (resp.status === 200) {
        console.log('getDailyActivitySummary', resp.data);
        setSummary(resp.data.summary);
        setGoals(resp.data.goals);
      } else {
        resp.status === 400 ? toast(resp.data.message) : toast('Something Went Wrong!');
      }
    };

    fetch();
  }, []);

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
              Activity Status
            </Title>
          </Col>
        </Row>
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

export default DailyGoalsCard;
