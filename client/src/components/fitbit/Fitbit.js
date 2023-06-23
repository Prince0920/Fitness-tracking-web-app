import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { disconnectFitbit, fitbitAuth, getActivityGoals, isFitbitLogin } from '../../utils/API';
import Layout from '../common/Layout';
import CalorieBurnCard from './cards/CalorieBurnCard';
import FitbitGreetingHeader from './cards/FitbitGreetingHeaderCard';
import LifetimeStatisticsCard from './cards/LifetimeStatisticsCard';
import TodayStatisticsCard from './cards/TodayStatisticsCard';

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
                <div className='col-md-12'>
                  <TodayStatisticsCard />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <CalorieBurnCard />
                </div>
              </div>

              <div className='row'>
                <div className='col-12'>
                  <LifetimeStatisticsCard
                    caloriesBurned={170000}
                    totalSteps={95000}
                    distanceTraveled={5000}
                    activeScore={13000}
                  />
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
