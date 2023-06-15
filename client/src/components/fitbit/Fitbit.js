import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { fitbitAuth } from '../../utils/API';
import Layout from '../common/Layout';
import FitbitGreetingHeader from './cards/FitbitGreetingHeaderCard';
import StepCountCard from './cards/StepCountCard';

export const Fitbit = () => {
  const token = localStorage.getItem('token');

  async function handleConnect() {
    await fitbitAuth(token);
  }

  const isLogin = true;
  return (
    <div className='content-wrapper'>
      <Layout
        heading='Fitbit Dashboard'
        item='fitbit'
      />
      <section className='content'>
        <div className='container-fluid'>
          {isLogin ? (
            <>
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
            </>
          ) : (
            <button
              type='button'
              class='btn btn-block btn-primary'
              onClick={handleConnect}>
              Connect to Fitbit
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
