import React from 'react';
import './AboutUs.css'; // Import a separate CSS file for custom styles

const AboutUs = () => {
  return (
    <div className='content-wrapper'>
      <section className='content'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
              <div className='card about-card'>
                <div className='card-body'>
                  <h2 className='card-title'>About Us</h2>
                  <br /> <hr />
                  <p>
                    Welcome to <span className='brand-name'>WearableHub</span>! We are passionate
                    about wearable devices and how they can improve our daily lives.
                  </p>
                  <p>
                    Our mission is to provide you with the latest information and reviews about
                    various wearable devices in the market. Whether you are looking for a fitness
                    tracker, a smartwatch, or any other wearable gadget, we've got you covered.
                  </p>
                  <p>
                    Our team of experts carefully tests and reviews each device to give you honest
                    and reliable insights.
                  </p>
                  <p>
                    We also aim to keep you updated with the latest trends and innovations in the
                    wearable technology industry.
                  </p>
                  <p>
                    If you have any questions, suggestions, or feedback, feel free to{' '}
                    <a href='#contact'>contact us</a>. We'd love to hear from you!
                  </p>
                  <p>
                    Thank you for visiting our website. We hope you find the information here
                    valuable and helpful in making the right choice for your wearable device needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
