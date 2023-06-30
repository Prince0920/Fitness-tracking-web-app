import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getDailyActivitySummary } from '../../../../../api/API';
import { default as GraphTitle, default as ProgressGraph } from '../../../../../reusable/graphs/ProgressGraph';

const DailyGoalsCard = () => {
  const [summary, setSummary] = useState(null);
  const [goals, setGoals] = useState(null);

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

  console.log('Summary: ', summary);
  console.log('Goals: ', goals);

  return (
    <>
      <GraphTitle title={'Activity Status'} />
      <Card className='card card-primary card-outline'>
        <div className='card-body'>
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
        </div>
      </Card>
    </>
  );
};

export default DailyGoalsCard;
