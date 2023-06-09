import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../constant';

const ResetPassword = () => {
  const navigate = useNavigate();

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
        //   navigate('/admin/dashboard');
      })
      .catch(e => {
        console.log('forgot password api error: ', e);
        if (e.response.status == 409) {
          toast(e.response.data.message);
        }
      });
  };

  return (
    <div className='hold-transition login-page'>
      <div className='login-logo'>
        <a href='../../index2.html'>
          <b>Admin</b>LTE
        </a>
      </div>
      <div className='card'>
        <div className='card-body login-card-body'>
          <p className='login-box-msg'>
            You are only one step a way from your new password, recover your password now.
          </p>
          <form
            action='login.html'
            method='post'>
            <div className='input-group mb-3'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
              />
              <div className='input-group-append'>
                <div className='input-group-text'>
                  <span className='fas fa-lock' />
                </div>
              </div>
            </div>
            <div className='input-group mb-3'>
              <input
                type='password'
                className='form-control'
                placeholder='Confirm Password'
              />
              <div className='input-group-append'>
                <div className='input-group-text'>
                  <span className='fas fa-lock' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <button
                  type='submit'
                  className='btn btn-primary btn-block'>
                  Change password
                </button>
              </div>
            </div>
          </form>
          <p className='mt-3 mb-1'>
            <a href='login.html'>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
