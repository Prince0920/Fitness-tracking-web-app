import './HealthFitnessAnalyticsCard.css';

export const HealthFitnessAnalyticsCard = ({ weight, height, age, expectedAge, bmi, category }) => {
  return (
    <div className='small-box health-fitness-card'>
      <div className='inner'>
        <h2 className='health-data-heading'>Health Fitness Analytics</h2>
        <div className='dashboard-info-container'>
          <div className='dashboard-info'>
            <h3>{weight} kg</h3>
            <p>Weight</p>
          </div>
          <div className='dashboard-info'>
            <h3>{height} ft</h3>
            <p>Height</p>
          </div>
          <div className='dashboard-info'>
            <h3>{age}</h3>
            <p>Actual Age</p>
          </div>
          <div className='dashboard-info'>
            <h3>{expectedAge}</h3>
            <p>Expected Age</p>
          </div>
          <div className='dashboard-info'>
            <h3>{bmi}</h3>
            <p>BMI</p>
          </div>
          <div className='dashboard-info'>
            <h3>{category}</h3>
            <p>BMI Category</p>
          </div>
        </div>
      </div>
      <div className='small-box-footer'>
        BMI <span className='bmi-text'>(Body Mass Index)</span>
      </div>
    </div>
  );
};
