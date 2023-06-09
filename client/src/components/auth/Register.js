import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../constant';

const Register = () => {
  const navigate = useNavigate();

  const [registerFromDetail, setReagisterFormDetail] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    setReagisterFormDetail({
      ...registerFromDetail,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const registerBody = {
      username: registerFromDetail.username,
      email: registerFromDetail.email,
      password: registerFromDetail.password,
      confirmPassword: registerFromDetail.confirmPassword,
    };
    const url = SERVER_URL + '/api/user';
    axios
      .post(url, registerBody)
      .then(resp => {
        console.log('Register api data: ', resp);
        navigate('/admin/login');
      })
      .catch(e => {
        console.log('Register api error: ', e);
        if (e.response.status == 422) {
          toast(e.response.data.error);
        }
        if (e.response.status == 409) {
          toast('Account already exist.');
        }
      });
  };

  return (
    <div className='hold-transition register-page'>
      <div className='register-box'>
        <div className='register-logo'>
          <div>
            <b>Admin</b>LTE
          </div>
        </div>
        <div className='card'>
          <div className='card-body register-card-body'>
            <p className='login-box-msg'>Register a new membership</p>
            <form onSubmit={handleSubmit}>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Username'
                  name='username'
                  value={registerFromDetail.username}
                  onChange={handleInputChange}
                />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-user' />
                  </div>
                </div>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Email'
                  name='email'
                  value={registerFromDetail.email}
                  onChange={handleInputChange}
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
                  value={registerFromDetail.password}
                  onChange={handleInputChange}
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
                  placeholder='Retype password'
                  name='confirmPassword'
                  value={registerFromDetail.confirmPassword}
                  onChange={handleInputChange}
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
                      id='agreeTerms'
                      name='terms'
                      defaultValue='agree'
                    />
                    <label htmlFor='agreeTerms'>
                      I agree to the <a href='#'>terms</a>
                    </label>
                  </div>
                </div>
                <div className='col-4'>
                  <input
                    type='submit'
                    className='btn btn-primary btn-block'></input>
                </div>
              </div>
            </form>
            {/* <div className="social-auth-links text-center">
              <p>- OR -</p>
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" />
                Sign up using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" />
                Sign up using Google+
              </a>
            </div> */}
            <Link
              to='/admin/login'
              className='text-center'>
              I already have a membership
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
