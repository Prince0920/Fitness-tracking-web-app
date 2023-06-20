import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../constant';

const ForgotPassword = () => {

  const [forgotFromDetail, setForgotFormDetail] = useState({
    email: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    setForgotFormDetail({
      ...forgotFromDetail,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const url = SERVER_URL + '/api/user/requestResetPassword';
    axios
      .post(url, forgotFromDetail)
      .then(resp => {
        console.log('forgot password api data: ', resp);
        toast('Password resent link send to your mail.');
      })
      .catch(e => {
        console.log('forgot password api error: ', e);
        if (e.response.status === 400) {
          toast(e.response.data.message);
        } else {
          toast('Server error!');
        }
      });
  };

  return (
    <div className='hold-transition login-page'>
      <div className='login-logo'>
        <div>
          <b>DotSquares</b>
        </div>
      </div>
      <div className='card'>
        <div className='card-body login-card-body'>
          <p className='login-box-msg'>
            You forgot your password? Here you can easily retrieve a new password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className='input-group mb-3'>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                name='email'
                value={forgotFromDetail.email}
                onChange={handleInputChange}
                required
              />
              <div className='input-group-append'>
                <div className='input-group-text'>
                  <span className='fas fa-envelope' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <button
                  type='submit'
                  className='btn btn-primary btn-block'>
                  Request new password
                </button>
              </div>
            </div>
          </form>
          <p className='mt-3 mb-1'>
            <Link
              to='/login'
              className='text-center'>
              Login
            </Link>
          </p>
          <p className='mb-0'>
            <Link
              to='/register'
              className='text-center'>
              Register a new membership
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
