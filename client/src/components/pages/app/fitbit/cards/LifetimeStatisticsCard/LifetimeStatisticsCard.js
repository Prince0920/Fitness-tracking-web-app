import { Card, Col, Progress, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getLifetimeStatics } from '../../../../../api/API';
import GraphTitle from '../../../../../reusable/title/GraphTitle';

const { Title } = Typography;

const LifetimeStatisticsCard = () => {
  const [total, setTotal] = useState({});

  const caloriesBurned = total?.caloriesOut;
  const totalSteps = total?.steps;
  const distanceTraveled = total?.distance;
  const activeScore = total?.activeScore;
  // Getting lifetime activity data
  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await getLifetimeStatics(localStorage.getItem('token'));
        console.log('getLifetimeStatics', resp.data.lifetime.total);
        setTotal(resp.data.lifetime.total);
      } catch (error) {
        error.status === 400
          ? toast.info(error.data.message)
          : console.log('getLifetimeStatics error', error);

        // On error set default value
        setTotal({
          caloriesOut: 170000,
          steps: 95000,
          distance: 5000,
          activeScore: 13000,
        });
      }
    };

    fetch();
  }, []);

  return (
    <>
      <GraphTitle title={'Lifetime Status'} />
      <Card className='card card-primary card-outline'>
        <div className='card-body'>
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
                    percent={100}
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
                    percent={100}
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
                    percent={100}
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
                    percent={100}
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
    </>
  );
};

export default LifetimeStatisticsCard;
