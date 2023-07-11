import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getDailyActivitySummary } from '../../../../../api/API';
import ProgressGraph from '../../../../../reusable/graphs/ProgressGraph';
import GraphTitle from '../../../../../reusable/title/GraphTitle';
import Loader from '../../../../../reusable/loader/Loader ';

const DailyGoalsCard = () => {
  const [summary, setSummary] = useState();
  const [goals, setGoals] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // Fetching activity goals.
  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await getDailyActivitySummary(localStorage.getItem('token'));
        console.log('getDailyActivitySummary', resp.data);
        setIsLoading(false);
        setSummary(resp.data.summary);
        setGoals(resp.data.goals);
      } catch (error) {
        error.status === 400
          ? toast.info(error.data.message)
          : console.log('getDailyActivitySummary error', error);
        setIsLoading(true);
        // If error setting default values
        setSummary({
          steps: 6000,
          distances: [
            {
              distance: 8.05,
            },
          ],
          caloriesOut: 9000,
        });
        setGoals({
          steps: 10000,
          distance: 10,
          caloriesOut: 15000,
        });
      }
    };

    fetch();
  }, []);

  console.log('Summary: ', summary);
  console.log('Goals: ', goals);

  return (
    <>
      <GraphTitle title={'Activity Status'} />
      <Card className='card card-primary card-outline'>
        <div className='card-body'>
          {isLoading ? (
            <Loader />
          ) : (
            <Row
              justify='space-between'
              align='middle'>
              <Col>
                <ProgressGraph
                  title='Step Count'
                  progressPercent={(summary?.steps / goals?.steps) * 100}
                  totalValue={goals?.steps}
                  currentValue={summary?.steps}
                />
              </Col>
              <Col>
                <ProgressGraph
                  title='Calories Burned'
                  progressPercent={(summary?.caloriesOut / goals?.caloriesOut) * 100}
                  totalValue={goals?.caloriesOut}
                  currentValue={summary?.caloriesOut}
                />
              </Col>
              <Col>
                <ProgressGraph
                  title='Distance Traveled'
                  progressPercent={(summary?.distances[0]?.distance / goals?.distance) * 100}
                  totalValue={goals?.distance}
                  currentValue={summary?.distances[0]?.distance}
                />
              </Col>
            </Row>
          )}
        </div>
      </Card>
    </>
  );
};

export default DailyGoalsCard;
