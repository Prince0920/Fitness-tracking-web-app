import React from 'react';
import Layout from '../common/Layout';

const EditUser = () => {
  return (
    <div className='content-wrapper'>
      <Layout
        heading='Edit User'
        item='editUser'
      />
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='card card-default'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='form-group col-md-6'>
                      <label htmlFor='exampleInputEmail1'>Username</label>
                      <input
                        type='text'
                        className='form-control'
                        id='exampleInputEmail1'
                        placeholder='Enter username'
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <label htmlFor='exampleInputEmail1'>Email address</label>
                      <input
                        type='email'
                        className='form-control'
                        id='exampleInputEmail1'
                        placeholder='Enter email'
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <label htmlFor='exampleInputEmail1'>Username</label>
                      <input
                        type='text'
                        className='form-control'
                        id='exampleInputEmail1'
                        placeholder='Enter username'
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <label htmlFor='exampleInputEmail1'>Email address</label>
                      <input
                        type='email'
                        className='form-control'
                        id='exampleInputEmail1'
                        placeholder='Enter email'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditUser;
