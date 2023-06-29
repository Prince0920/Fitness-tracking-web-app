import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../../reusable/layout/Layout';
import StepCountCard from './cards/StepCountCard';
import GreetingCard from '../../../reusable/cards/GreetingCard';

export const Apple = () => {
  async function handleConnect() {
    alert('Handle Connect functionality');
  }

  async function handleDisconnect() {
    alert('Handle Disconnect functionality');
  }
  const isLogin = false;

  return (
    <div className='content-wrapper'>
      <Layout
        heading='Apple Dashboard'
        item='apple'
      />
      <section className='content'>
        <div className='container-fluid'>
          {isLogin ? (
            <>
              <div className='row'>
                <div className='col-12'>
                  <GreetingCard
                    username={'Prince'}
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
              Connect to Apple
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
