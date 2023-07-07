import React, { useState } from 'react';

const ContactUs = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form values:', formValues);
  };

  return (
    <div
      className='content-wrapper'>
      <section className='content'>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <div className='card mt-4'>
                <div className='card-body'>
                  <h2>Contact Us</h2>
                  <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                      <div className='form-label'>
                        <label htmlFor='name'>Name</label>
                      </div>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={formValues.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={formValues.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='message'>Message</label>
                      <textarea
                        className='form-control'
                        id='message'
                        name='message'
                        value={formValues.message}
                        onChange={handleChange}
                        rows={4}
                        required></textarea>
                    </div>
                    <button
                      type='submit'
                      className='btn btn-primary'>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
