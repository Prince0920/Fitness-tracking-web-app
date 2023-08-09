import { Card, Col, Progress, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getActivityTimeseriesByDateRange } from '../../../../../api/API';
import InputDropdown from '../../../../../reusable/forms/InputDropdown';
import { getDateRangeByPeriod } from '../../../../../reusable/helper_functions/getDateRangeByPeriod';
import Loader from '../../../../../reusable/loader/Loader ';
import GraphTitle from '../../../../../reusable/title/GraphTitle';

const { Title } = Typography;

const LifetimeStatisticsCard = () => {
  const dropDownOptions = ['Last Week', 'Last Quarter', 'Last Year'];

  const [total, setTotal] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const caloriesBurned = total?.caloriesOut;
  const totalSteps = total?.steps;
  const distanceTraveled = total?.distance;
  // const activeScore = total?.activeScore;

  const [selectedDropdownOption, setSelectedDropdownOption] = useState('Last Week');

  // Getting lifetime activity data
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const resp = await getLifetimeStatics(localStorage.getItem('token'));
  //       console.log('getLifetimeStatics', resp.data.lifetime.total);
  //       setIsLoading(false);
  //       setTotal(resp.data.lifetime.total);
  //     } catch (error) {
  //       error.status === 400
  //         ? toast.info(error.data.message)
  //         : console.log('getLifetimeStatics error', error);
  //       setIsLoading(true);
  //       // On error set default value
  //       setTotal({
  //         caloriesOut: 170000,
  //         steps: 95000,
  //         distance: 5000,
  //         activeScore: 13000,
  //       });
  //     }
  //   };

  //   fetch();
  // }, []);

  const fetchActivityData = async (activity, formattedStartDate, formattedEndDate) => {
    try {
      const resp = await getActivityTimeseriesByDateRange(
        localStorage.getItem('token'),
        activity,
        formattedStartDate,
        formattedEndDate
      );
      console.log('getActivityTimeseriesByDateRange', resp.data[`activities-tracker-${activity}`]);

      // adding the data
      let sum = 0;
      const data = resp.data[`activities-tracker-${activity}`];
      if (data && data?.length > 0) {
        data.map(item => {
          return (sum += Number(item.value));
        });
      }

      return sum;
    } catch (error) {
      if (error.status === 400) {
        toast.info(error.data.message);
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const { startdate, enddate } = getDateRangeByPeriod(selectedDropdownOption);
    console.log('startdate, enddate', startdate, enddate);
    const fetch = async () => {
      const stepData = await fetchActivityData('steps', startdate, enddate);
      const calorieData = await fetchActivityData('calories', startdate, enddate);
      const distanceData = await fetchActivityData('distance', startdate, enddate);
      console.log('stepData, calorieData , distanceData', stepData, calorieData, distanceData);
      setTotal({
        caloriesOut: calorieData,
        steps: stepData,
        distance: distanceData,
      });
      setIsLoading(false);
    };

    fetch();
  }, [selectedDropdownOption]);

  return (
    <>
      <GraphTitle title={'Lifetime Status'} />
      <Card className='card card-primary card-outline'>
        <div className='card-body'>
          <div className='card-text'>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                  <InputDropdown
                    options={dropDownOptions}
                    value={selectedDropdownOption}
                    onChange={setSelectedDropdownOption}
                  />
                </div>
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
                  {/* <Col
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
                </Col> */}
                </Row>
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default LifetimeStatisticsCard;
