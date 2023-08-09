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
  const [isSync, setIsSync] = useState(false);

  async function handleConnect() {
    await fitbitAuth(token);
  }

  async function handleSyncData() {
    setIsLoading(true);
    const resp = await syncFitbitData(token, 'fitbit');
    setIsLoading(false);
    setIsSync(true);
    console.log('resp::::::::::::::::::::::::::', resp);
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const resp = await isFitbitLogin(token);
      if (resp.status === 200) {
        setIsLoading(false);
        setIsLogin(true);
        setIsSync(resp.data.isSync);
        setUsername(resp.data.displayName);
      } else if (resp.status === 400) {
        toast.info(resp.data.message);
      } else {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [token]);

  console.log('IsSync: ', isSync);
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
                {isSync ? (
                  <>
                    <div className='row'>
                      <div className='col-12'>
                        <LifetimeStatisticsCard />
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-12'>
                        <ExerciseTrackingCard />
                      </div>
                    </div>
                    {/* <div className='row'>
                      <div className='col-md-12'>
                        <DailyGoalsCard />
                      </div>
                    </div> */}
                  </>
                ) : (
                  <div
                    className='col-12'
                    style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF4500' }}>
                      Sync Required:
                    </p>
                    <p style={{ fontSize: '1.2rem', color: '#333' }}>
                      Please sync your data to view your dashboard.
                    </p>
                  </div>
                )}
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
