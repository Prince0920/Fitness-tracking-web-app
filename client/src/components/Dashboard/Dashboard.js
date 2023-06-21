import React from 'react';
import './Dashboard.css';
import Layout from '../common/Layout';
import { HealthFitnessAnalyticsCard } from './Card/HealthFitnessAnalyticsCard';
import { DietSuggestionsCard } from './Card/DietSuggestionsCard';

const Dashboard = () => {
  const calculateBMI = (weight, height) => {
    const bmi = (weight / (height * 0.3048) ** 2).toFixed(2); // Convert height from feet to meters
    return bmi;
  };

  const calculateExpectedAge = (bmi, age) => {
    let expectedAge;
    if (bmi < 18.5) {
      expectedAge = age + 5;
    } else if (bmi >= 18.5 && bmi < 25) {
      expectedAge = age + 10;
    } else if (bmi >= 25 && bmi < 30) {
      expectedAge = age + 2;
    } else {
      expectedAge = age - 5;
    }
    return expectedAge;
  };

  const calculateBMICategory = bmi => {
    let category;
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal weight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
    return category;
  };

  const weight = 611; // Example weight value in kilograms
  const height = 5.8399; // Example height value in feet
  const age = 23; // Example age value

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
