import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { disconnectFitbit, fitbitAuth, isFitbitLogin, syncFitbitData } from '../../../api/API';
import GreetingCard from '../../../reusable/cards/GreetingCard';
import Layout from '../../../reusable/layout/Layout';
import Loader from '../../../reusable/loader/Loader ';
import DailyGoalsCard from './cards/DailyGoalsCard/DailyGoalsCard';
import ExerciseTrackingCard from './cards/ExerciseTrackingCard/ExerciseTrackingCard';
import LifetimeStatisticsCard from './cards/LifetimeStatisticsCard/LifetimeStatisticsCard';

const Fitbit = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');

  async function handleConnect() {
    await fitbitAuth(token);
  }

  async function handleSyncData() {
    const resp = await syncFitbitData(token, 'fitbit');
    console.log('resp::::::::::::::::::::::::::', resp);
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const resp = await isFitbitLogin(token);
      if (resp.status === 200) {
        setIsLoading(false);
        setIsLogin(true);
        setUsername(resp.data.displayName);
      } else if (resp.status === 400) {
        toast.info(resp.data.message);
      } else {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [token]);

  const handleDisconnect = async () => {
    const confirmDisconnect = window.confirm(
      'Are you sure you want to disconnect from Fitbit it will remove your all history?'
    );
    if (confirmDisconnect) {
      const resp = await disconnectFitbit(token);
      if (resp.status === 200) {
        setIsLogin(false);
        navigate('/admin/fitbit/dashboard');
      } else {
        resp.status === 400 ? toast.info(resp.data.message) : toast.error('Something Went Wrong!');
      }
    }
  };

  return (
    <div className={`content-wrapper ${isLoading ? 'content blur' : 'content'}`}>
      <Layout
        heading='Fitbit Dashboard'
        item='fitbit'
      />
      {isLoading ? (
        <Loader />
      ) : (
        <section className='content'>
          <div className='container-fluid'>
            {isLogin ? (
              <>
                <div className='row'>
                  <div className='col-12'>
                    <GreetingCard
                      username={username}
                      handleDisconnect={handleDisconnect}
                      handleSyncData={handleSyncData}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <DailyGoalsCard />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <ExerciseTrackingCard />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-12'>
                    <LifetimeStatisticsCard />
                  </div>
                </div>
              </>
            ) : (
              <button
                type='button'
                className='btn btn-block btn-primary'
                onClick={handleConnect}>
                Connect to Fitbit
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Fitbit;
