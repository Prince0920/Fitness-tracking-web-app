import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUp } from '../../../api/API';

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (registerFromDetail.password !== registerFromDetail.confirmPassword) {
      toast.warning('Password and confirm password not match.');
    } else {
      const registerBody = {
        username: registerFromDetail.username,
        email: registerFromDetail.email,
        password: registerFromDetail.password,
        confirmPassword: registerFromDetail.confirmPassword,
      };
      const resp = await signUp(registerBody);
      if (resp.status === 200) {
        navigate('/admin/login');
      } else {
        resp.status === 400 ? toast.info(resp.data.message) : toast.error('Something Went Wrong!');
      }
    }
  };

  return (
    <div className='hold-transition register-page'>
      <div className='register-box card card-primary card-outline'>
        <div className='register-logo'>
          <div>
            <b>DotSquares</b>
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
                  required
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
                  value={registerFromDetail.password}
                  onChange={handleInputChange}
                  required
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
                      id='agreeTerms'
                      required
                      name='terms'
                      defaultValue='agree'
                    />
                    <label htmlFor='agreeTerms'>I agree to the terms</label>
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
              to='/login'
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
