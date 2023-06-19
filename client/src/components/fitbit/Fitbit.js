import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fitbitAuth, isFitbitLogin, disconnectFitbit } from '../../utils/API';
import Layout from '../common/Layout';
import FitbitGreetingHeader from './cards/FitbitGreetingHeaderCard';
import StepCountCard from './cards/StepCountCard';

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
      const fitbitData = await isFitbitLogin(token);
      if (fitbitData.status === 200) {
        setIsLogin(true);
        setUsername(fitbitData.data.displayName);
      } else if (fitbitData.status === 400) {
        toast('something went wrong!');
      }
    };

    checkLoginStatus();
  }, [token]);

  const handleDisconnect = async () => {
    const data = await disconnectFitbit(token);
    if (data.status === 200) {
      setIsLogin(false);
      navigate('/admin/fitbit/dashboard');
    } else {
      toast('Something went wrong!');
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
