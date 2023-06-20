import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../utils/API';
import { toast } from 'react-toastify';

const EditUser = () => {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getUser(token, id);
      if (resp.status === 200) {
        setUser(resp.data);
        setEditedUser({
          ...resp.data,
          password: '',
        });
      } else {
        resp.status === 400 ? toast(resp.data.message) : toast('Something Went Wrong!');
      }
    };
    fetchData();
  }, [token, id]);

  const handleCancel = () => {
    setEditedUser({
      ...user,
      password: '',
    });
    navigate('/admin/users/userList');
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditedUser(prevEditedUser => ({
      ...prevEditedUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const resp = await updateUser(token, id, {
      username: editedUser.username,
      email: editedUser.email,
      password: editedUser.password,
    });

    if (resp.status === 200) {
      toast('User updated successfully!');
      navigate('/admin/users/userList');
    } else {
      resp.status === 400 ? toast(resp.data.message) : toast('Something Went Wrong!');
    }
  };

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
                  <div className='row align-items-end'>
                    <div className='form-group col-md-6'>
                      <label htmlFor='exampleInputEmail1'>Username</label>
                      <input
                        type='text'
                        className='form-control'
                        name='username'
                        placeholder='Enter username'
                        onChange={handleInputChange}
                        defaultValue={user.username}
                        value={editedUser.username}
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <label htmlFor='exampleInputEmail1'>Email address</label>
                      <input
                        type='email'
                        className='form-control'
                        placeholder='Enter email'
                        name='email'
                        onChange={handleInputChange}
                        defaultValue={user.email}
                        value={editedUser.email}
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <label htmlFor='exampleInputPassword1'>Password</label>
                      <input
                        type='password'
                        className='form-control'
                        placeholder='********'
                        name='password'
                        onChange={handleInputChange}
                        value={editedUser.password}
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

export default EditUser;
