import { Card, Col, Progress, Row, Typography } from 'antd';
import React from 'react';
import GraphTitle from '../../../../../reusable/title/GraphTitle';

const { Title } = Typography;

const LifetimeStatisticsCard = ({ caloriesBurned, totalSteps, distanceTraveled, activeScore }) => {
  // Getting lifetime activity data
  // useEffect(() => {
  //   const fetch = async () => {
  //     const resp = await getLifetimeStatics(localStorage.getItem('token'));
  //     if (resp.status === 200) {
  //       console.log('getLifetimeStatics', resp.data);
  //     } else {
  //       resp.status === 400 ? toast(resp.data.message) : toast('Something Went Wrong!');
  //     }
  //   };

  //   fetch();
  // }, []);

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
    </>
  );
};

export default LifetimeStatisticsCard;
