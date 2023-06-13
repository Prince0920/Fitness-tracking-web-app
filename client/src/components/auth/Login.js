import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../constant';

const Login = () => {
  const navigate = useNavigate();

  const [loginFromDetail, setLoginFormDetail] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    setLoginFormDetail({
      ...loginFromDetail,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const url = SERVER_URL + '/api/user/login';
    axios
      .post(url, loginFromDetail)
      .then(resp => {
        console.log('Login api data: ', resp);
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('username', resp.data.user.username);
        navigate('/admin/dashboard');
      })
      .catch(e => {
        console.log('Login api error: ', e);
        if (e.response.status == 422) {
          toast(e.response.data.error);
        }
        if (e.response.status == 400) {
          toast(e.response.data.message);
        }
      });
  };

  return (
    <div className='hold-transition login-page'>
      <div className='login-box'>
        <div className='login-logo'>
          <div>
            <b>DotSquares</b>
          </div>
        </div>
        <div className='card'>
          <div className='card-body login-card-body'>
            <p className='login-box-msg'>Sign in to start your session</p>
            <form onSubmit={handleSubmit}>
              <div className='input-group mb-3'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email'
                  name='email'
                  value={loginFromDetail.email}
                  onChange={handleInputChange}
                  required
                />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-envelope' />
                  </div>
                </div>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  name='password'
                  value={loginFromDetail.password}
                  onChange={handleInputChange}
                  required
                />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-lock' />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-8'>
                  <div className='icheck-primary'>
                    <input
                      type='checkbox'
                      id='remember'
                      required
                    />
                    <label htmlFor='remember'>Remember Me</label>
                  </div>
                </div>
                <div className='col-4'>
                  <input
                    type='submit'
                    className='btn btn-primary btn-block'></input>
                </div>
              </div>
            </form>
            {/* <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
              </a>
            </div> */}
            <p className='mb-1'>
              <Link
                to='/forgotPassword'
                className='text-center'>
                I forgot my password
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
    </div>
  );
};

export default Login;
