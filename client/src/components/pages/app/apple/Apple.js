import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from '../../../reusable/Models/LoginModel';
import GreetingCard from '../../../reusable/cards/GreetingCard';
import Layout from '../../../reusable/layout/Layout';
import StepCountCard from './cards/StepCountCard';

export const Apple = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleModelVisibility = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalSubmit = values => {
    console.log('Login Values values:', values);

    // Setting login to true hard coded.
    setIsLogin(true);

    setIsModalVisible(false);
  };

  async function handleDisconnect() {
    const confirmDisconnect = window.confirm(
      'Are you sure you want to disconnect from apple watch it will remove your all history?'
    );
    if (confirmDisconnect) {
      // setting login to false hardcoded.
      setIsLogin(false);
    }
  }

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
                  <StepCountCard
                    totalSteps={10000}
                    currentSteps={6000}
                  />
                </div>
              </div>
            </>
          ) : (
            <button
              type='button'
              className='btn btn-block btn-primary'
              onClick={handleModelVisibility}>
              Connect to Apple
            </button>
          )}
          <LoginModal
            isModalVisible={isModalVisible}
            handleModalCancel={handleModalCancel}
            handleModalSubmit={handleModalSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default Apple;
