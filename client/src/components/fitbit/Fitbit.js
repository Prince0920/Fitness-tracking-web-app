import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fitbitAuth, isFitbitLogin, disconnectFitbit, getActivityGoals } from '../../utils/API';
import Layout from '../common/Layout';
import FitbitGreetingHeader from './cards/FitbitGreetingHeaderCard';
import StepCountCard from './cards/StepCountCard';
import CalorieBurnCard from './cards/CalorieBurnCard';

export const Fitbit = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');

  async function handleConnect() {
    await fitbitAuth(token);
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const resp = await isFitbitLogin(token);
      if (resp.status === 200) {
        setIsLogin(true);
        setUsername(resp.data.displayName);
      } else if (resp.status === 400) {
        toast(resp.data.message);
      }
    };

    checkLoginStatus();
  }, [token]);

  // Fetching activity goals.
  useEffect(() => {
    const fetch = async () => {
      const resp = await getActivityGoals(token);
      if (resp.status === 200) {
        console.log('getActivityGoals', resp.data.goals);
      } else {
        resp.status === 400 ? toast(resp.data.message) : toast('Something Went Wrong!');
      }
    };

    if (isLogin) {
      fetch();
    }
  }, [token, isLogin]);

  const handleDisconnect = async () => {
    const resp = await disconnectFitbit(token);
    if (resp.status === 200) {
      setIsLogin(false);
      navigate('/admin/fitbit/dashboard');
    } else {
      resp.status === 400 ? toast(resp.data.message) : toast('Something Went Wrong!');
    }
  };

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
                  <FitbitGreetingHeader
                    username={username}
                    handleDisconnect={handleDisconnect}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <StepCountCard />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <CalorieBurnCard />
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
