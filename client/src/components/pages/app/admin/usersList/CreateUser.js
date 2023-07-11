import React, { useState } from 'react';
import Layout from '../../../../reusable/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../../api/API';
import { toast } from 'react-toastify';
import InputEmail from '../../../../reusable/forms/InputEmail';
import InputPassword from '../../../../reusable/forms/InputPassword';
import InputText from '../../../../reusable/forms/InputText';

const CreateUser = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const resp = await createUser(token, {
      username: user.username,
      email: user.email,
      password: user.password,
    });
    if (resp.status === 200) {
      toast.success('User created successfully!');
      navigate('/admin/users/userList');
    } else {
      resp.status === 400 ? toast.info(resp.data.message) : toast.error('Something Went Wrong!');
    }
  };

  const handleCancel = () => {
    setUser({
      username: '',
      email: '',
      password: '',
    });
    navigate('/admin/users/userList');
  };

  return (
    <div className='content-wrapper'>
      <Layout
        heading='Create User'
        item='createUser'
      />
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='card card-default'>
                <div className='card-body'>
                  <div className='row align-items-end'>
                    <div className='form-group col-md-6'>
                      <InputText
                        label={'Username'}
                        value={user.username}
                        handleInputChange={handleInputChange}
                        name='username'
                      />
                    </div>
                    <div className='form-group col-md-6'>
                      <InputEmail
                        value={user.email}
                        handleInputChange={handleInputChange}
                        name='email'
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <InputPassword
                        value={user.password}
                        handleInputChange={handleInputChange}
                        name='password'
                      />
                    </div>
                    <div className='form-group col-md-6'>
                      <div className='d-flex justify-content-end'>
                        <button
                          type='button'
                          className='btn btn-primary'
                          onClick={handleSave}>
                          Save
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger ml-2'
                          onClick={handleCancel}>
                          Cancel
                        </button>
                      </div>
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

export default CreateUser;
