import React, { useState } from 'react';
import Layout from '../../../reusable/layout/Layout';
import GreetingCard from '../../../reusable/cards/GreetingCard';
import Loader from '../../../reusable/loader/Loader ';
import { stravaAuth } from '../../../api/API';
import { useNavigate } from 'react-router-dom';

const Strava = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');

  const handleDisconnect = async() => {
    alert("handleDisconnect");
  };

  const handleConnect = async() => {
    await stravaAuth(token);
  };
  
  return (
    <div className={`content-wrapper`}>
      <Layout
        heading='Strava Dashboard'
        item='strava'
      />
      <section className='content'>
        <div className='container-fluid'>
          {isLogin ? (
            isLoading ? (
              <Loader />
            ) : (
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
            )
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
    </div>
  );
};

export default Strava;
