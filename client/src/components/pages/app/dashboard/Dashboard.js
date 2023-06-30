import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Layout from '../../../reusable/layout/Layout';
import { HealthFitnessAnalyticsCard } from './Card/HealthFitnessAnalyticsCard';
import { DietSuggestionsCard } from './Card/DietSuggestionsCard';
import { getProfile } from '../../../api/API';
import { toast } from 'react-toastify';
import { calculateBMI, calculateBMICategory, calculateExpectedAge } from './helperFunction';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const [profileDetail, setProfileDetail] = useState({
    height: 0,
    weight: 0,
    age: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getProfile(token);
      if (resp.status === 200) {
        const { data } = resp;
        setProfileDetail({
          height: data.height,
          weight: data.weight,
          age: data.age,
        });
      } else {
        return resp.status === 400 ? toast.info(resp.data.message) : toast.error('Something Went Wrong!');
      }
    };

    fetchData();
  }, [token]);

  const { weight, height, age } = profileDetail;
  const bmi = calculateBMI(weight, height);
  const expectedAge = calculateExpectedAge(bmi, age);
  const category = calculateBMICategory(bmi);

  return (
    <div className='content-wrapper'>
      <Layout
        heading='Dashboard'
        item='dashboard'
      />
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <HealthFitnessAnalyticsCard
                weight={weight}
                height={height}
                age={age}
                expectedAge={expectedAge}
                bmi={bmi}
                category={category}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <DietSuggestionsCard category={category} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
