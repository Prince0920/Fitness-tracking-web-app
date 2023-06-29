import React from 'react';
import { getTodayDate } from '../../reusable/helper_functions/getCurrentDate';

const FitbitGreetingHeader = ({ username , handleDisconnect }) => {
  const currentDate = getTodayDate();

  return (
    <div
      className='card card-primary card-outline'
      style={{ backgroundColor: '#f2f2f2', paddingRight: '20px' }}>
      <div
        className='card-body'
        style={{ height: 'auto' }}>
        <div className='greeting-card'>
          <div className='row'>
            <div className='col-md-8'>
              <p
                className='card-text greeting-text'
                style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#CC5500' }}>
                Hi <span style={{ color: '#3366CC' }}>{username}</span>, welcome!
              </p>
              <p
                className='card-text greeting-date'
                style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3366CC' }}>
                {currentDate}
              </p>
            </div>
            <div
              className='col-md-4'
              style={{ textAlign: 'right' }}>
              <button
                className='btn btn-danger'
                style={{ marginRight: '10px' }}
                onClick={handleDisconnect}>
                Disconnect
              </button>
              {/* <p className='card-text greeting-text' style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000000', textAlign: 'center' }}>
                <span style={{ color: '#000000' }}>Fitbit</span>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitbitGreetingHeader;
