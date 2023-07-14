import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from '../../../reusable/Models/LoginModel';
import GreetingCard from '../../../reusable/cards/GreetingCard';
import Layout from '../../../reusable/layout/Layout';
import StepCountCard from './cards/StepCountCard';

export const Apple = () => {
  async function handleDisconnect() {
    alert('Handle Disconnect functionality');
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModelVisibility = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalSubmit = (values) => {
    console.log('Signup values:', values);
    setIsModalVisible(false);
  };

  const isLogin = false;

  return (
    <div className='content-wrapper'>
      <Layout heading='Apple Dashboard' item='apple' />
      <section className='content'>
        <div className='container-fluid'>
          {isLogin ? (
            <>
              <div className='row'>
                <div className='col-12'>
                  <GreetingCard username={'Prince'} handleDisconnect={handleDisconnect} />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <StepCountCard />
                </div>
              </div>
            </>
          ) : (
            <button type='button' className='btn btn-block btn-primary' onClick={handleModelVisibility}>
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
