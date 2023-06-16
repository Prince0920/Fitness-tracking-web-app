import React, { useEffect } from 'react';
import Layout from '../common/Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createFitbit } from '../../utils/API';

const FitbitExchangeAccessToken = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const create = async () => {
      const data = await createFitbit(token, {
        fitbitMongoId: searchParams.get('fitbitMongoId')
      });
      if (data.status === 200) {
        navigate('/admin/fitbit/dashboard');
      }
    };
    create();
  }, [token, searchParams, navigate]);
  return (
    <div className='content-wrapper'>
      <Layout
        heading='Fitbit Dashboard'
        item='fitbit'
      />
    </div>
  );
};

export default FitbitExchangeAccessToken;
