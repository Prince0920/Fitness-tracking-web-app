import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../common/Layout';
import CalorieBurnGraph from './graphs/CalorieBurnGraph';
import StepCountProgressGraph from './graphs/StepCountProgressGraph';
import { getTodayDate } from '../../utils/getCurrentDate';
import FitbitGreetingHeader from './cards/FitbitGreetingHeaderCard';
import StepCountCard from './cards/StepCountCard';

export const Fitbit = () => {
  useEffect(() => {
    // Canvas rendering fix
    const knobs = document.getElementsByClassName('knob');
    if (knobs.length > 0) {
      window.$(knobs).knob();
    }
  }, []);
  const calorieData = [
    { time: '9 AM', calories: 500 },
    { time: '10 AM', calories: 700 },
    { time: '11 AM', calories: 400 },
    // Add more data points as per your requirement
  ];

  
  return (
    <div className='content-wrapper'>
      <Layout
        heading='Fitbit Dashboard'
        item='fitbit'
      />
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <FitbitGreetingHeader />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <StepCountCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
