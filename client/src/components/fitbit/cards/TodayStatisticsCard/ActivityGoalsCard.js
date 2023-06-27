import React, { useEffect, useState } from 'react';
import { Progress, Card, Typography, Row, Col, Divider, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getActivityGoals } from '../../../../utils/API';
import { toast } from 'react-toastify';

const { Title } = Typography;

const ActivityGoalsCard = () => {
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

  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const handleMenuClick = ({ key }) => {
    setSelectedPeriod(key);
    // Handle menu click here
    console.log('Selected:', key);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      selectedKeys={[selectedPeriod]}>
      <Menu.Item key='daily'>Daily</Menu.Item>
      <Menu.Item key='weekly'>Weekly</Menu.Item>
    </Menu>
  );

  // Fetching activity goals.
  useEffect(() => {
    const fetch = async () => {
      const resp = await getActivityGoals(localStorage.getItem('token'), selectedPeriod);
      if (resp.status === 200) {
        console.log('getActivityGoals', resp.data.goals);
      } else {
        resp.status === 400 ? toast(resp.data.message) : toast('Something Went Wrong!');
      }
    };

    fetch();
  }, [selectedPeriod]);

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
              Activity Goals
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

export default ActivityGoalsCard;
