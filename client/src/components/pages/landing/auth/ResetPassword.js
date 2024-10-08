import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword } from '../../../api/API';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('id');

  const [resetFromDetail, setResetFormDetail] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    setResetFormDetail({
      ...resetFromDetail,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (resetFromDetail.password !== resetFromDetail.confirmPassword) {
      toast.warning('Password and confirm password not match.');
    } else {
      const resp = await resetPassword(token, userId, resetFromDetail.password);
      if (resp.status === 200) {
        toast.success('Password resent Successfully.');
        navigate('/admin/login');
      } else {
        resp.status === 400 ? toast.info(resp.data.message) : toast.error('Something Went Wrong!');
      }
    }
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
            You are only one step a way from your new password, recover your password now.
          </p>
          <form onSubmit={handleSubmit}>
            <div className='input-group mb-3'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                name='password'
                value={resetFromDetail.password}
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
                value={resetFromDetail.confirmPassword}
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
            <Link
              to='/login'
              className='text-center'>
              I already have a membership
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
