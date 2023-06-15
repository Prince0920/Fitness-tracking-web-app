import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../common/Layout';
import AppleGreetingHeader from './cards/AppleGreetingHeaderCard';
import StepCountCard from './cards/StepCountCard';

export const Apple = () => {
  async function handleConnect() {
    alert('Handle Connect functionality');
  }
  const isLogin = true;

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
                  <AppleGreetingHeader />
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
