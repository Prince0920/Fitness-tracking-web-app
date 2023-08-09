import React from 'react';
import StepCountProgressGraph from '../graphs/StepCountProgressGraph'

const StepCountCard = ({totalSteps, currentSteps}) => {

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
          currentSteps={currentSteps}
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
