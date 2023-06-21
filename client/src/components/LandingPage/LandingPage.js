import React from 'react';
import './landing-page.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const token = localStorage.getItem('token');

  return (
    <div className='home-container'>
      <header className='home-header'>
        <h1>Health Tracking App</h1>
        {token ? (
          <></>
        ) : (
          <div className='home-button-container'>
            <Link
              to='/login'
              className='home-login-button'>
              Login
            </Link>
            <Link
              to='/register'
              className='home-signup-button'>
              Sign Up
            </Link>
          </div>
        )}
      </header>

      <div className='home-content'>
        <h2>Track and Improve Your Health</h2>
        <p>
          Monitor your fitness, track your daily activities, and achieve your health goals with our
          advanced health tracking app.
        </p>
        <Link
          to='/admin/dashboard'
          className='home-cta-button'>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
