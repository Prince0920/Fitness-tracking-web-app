import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { updateFitbit, fitbitAuth } from '../../utils/API';
import Layout from '../common/Layout';
import FitbitGreetingHeader from './cards/FitbitGreetingHeaderCard';
import StepCountCard from './cards/StepCountCard';

export const Fitbit = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  async function handleConnect() {
    await fitbitAuth(token);
  }

  useEffect(() => {
    const create = async () => {
      const data = await updateFitbit(token, {
        profileId: searchParams.get('profileId'),
      });
      if (data.status === 200) {
        navigate('/admin/fitbit/dashboard');
      }
    };
    create();
  }, [token, searchParams, navigate]);

  const isLogin = false;
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
