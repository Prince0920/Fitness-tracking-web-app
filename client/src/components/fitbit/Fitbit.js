import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateFitbit, fitbitAuth, isFitbitLogin } from '../../utils/API';
import Layout from '../common/Layout';
import FitbitGreetingHeader from './cards/FitbitGreetingHeaderCard';
import StepCountCard from './cards/StepCountCard';

export const Fitbit = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');

  async function handleConnect() {
    await fitbitAuth(token);
  }

  useEffect(() => {
    const create = async () => {
      const data = await updateFitbit(token, {
        profileId: searchParams.get('profileId'),
      });
      if (data.status === 200) {
        setIsLogin(prev => !prev);
        navigate('/admin/fitbit/dashboard');
      } else {
        toast('Something went wrong please try again!');
      }
    };
    if (searchParams.get('profileId')) create();
  }, [token, searchParams, navigate]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const fitbitData = await isFitbitLogin(token);
      console.log("fitbitData", fitbitData)
      if (fitbitData.status === 200) {
        setIsLogin(prev => !prev);
        setUsername(fitbitData.data.displayName);
      }else if(fitbitData.status === 400){
        toast('something went wrong!');
      }
    };

    checkLoginStatus();
  }, [token]);

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
                  <FitbitGreetingHeader username={username} />
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
