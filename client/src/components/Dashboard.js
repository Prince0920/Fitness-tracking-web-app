import React, { Component } from 'react';
import './Dashboard.css';
import Layout from './common/Layout';

export default class Dashboard extends Component {
  render() {
    const weight = 70; // Example weight value in kilograms
    const height = 175; // Example height value in centimeters
    const age = 25; // Example age value

    // Calculate BMI
    const bmi = (weight / (height / 100) ** 2).toFixed(2);

    // Determine BMI category
    let category;
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    // Estimate expected age based on BMI
    let expectedAge;
    if (bmi < 18.5) {
      expectedAge = age + 5;
    } else if (bmi >= 18.5 && bmi < 25) {
      expectedAge = age + 10;
    } else if (bmi >= 25 && bmi < 30) {
      expectedAge = age + 2;
    } else {
      expectedAge = age - 5;
    }

    return (
      <div className='content-wrapper'>
        <Layout
          heading='Dashboard'
          item='dashboard'
        />
        <section className='content'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12'>
                <div className='small-box bg-warning'>
                  <div className='inner'>
                    <div className='dashboard-info-container'>
                      <div className='dashboard-info'>
                        <h3>{weight}</h3>
                        <p>Weight</p>
                      </div>
                      <div className='dashboard-info'>
                        <h3>{height}</h3>
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
                  <div className='small-box-footer'>Body Mass Index Analysis</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
