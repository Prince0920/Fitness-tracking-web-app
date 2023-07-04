import React from 'react';
import StepCountProgressGraph from '../graphs/StepCountProgressGraph'

const StepCountCard = () => {
  const totalSteps = 10000;

  return (
    <div className='card card-primary card-outline'>
      <div className='card-body'>
        <h5
          className='card-title'
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#CC5500',
          }}>
          Step Count
        </h5>
        <StepCountProgressGraph
          targetSteps={totalSteps}
          currentSteps={6000}
        />
        <p
          className='card-text total-steps'
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#CC5500',
            position: 'absolute',
            top: '15px',
            right: '10px',
          }}>
          Total Steps: {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default StepCountCard;
