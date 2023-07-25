import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isStravaLogin, stravaAuth } from '../../../api/API';
import GreetingCard from '../../../reusable/cards/GreetingCard';
import Layout from '../../../reusable/layout/Layout';
import Loader from '../../../reusable/loader/Loader ';

const Strava = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');

  const handleDisconnect = async () => {
    alert('handleDisconnect');
  };

  const handleConnect = async () => {
    await stravaAuth(token);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const resp = await isStravaLogin(token);
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

  return (
    <div className={`content-wrapper`}>
      <Layout
        heading='Strava Dashboard'
        item='strava'
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
                    />
                  </div>
                </div>
              </>
            ) : (
              <button
                type='button'
                className='btn btn-block btn-primary'
                onClick={handleConnect}>
                Connect to Strava
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Strava;
