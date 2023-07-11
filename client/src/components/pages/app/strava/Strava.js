import React from 'react';
import Layout from '../../../reusable/layout/Layout';

const Strava = () => {
  return (
    <div className={`content-wrapper`}>
      <Layout
        heading='Strava Dashboard'
        item='strava'
      />

      <section className='content'>
        <div className='container-fluid'>Strava Dashboard</div>
      </section>
    </div>
  );
};

export default Strava;
