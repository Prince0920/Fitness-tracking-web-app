import React, { useEffect, useState } from 'react';
import Layout from '../../../../reusable/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../../../api/API';
import { toast } from 'react-toastify';
import InputEmail from '../../../../reusable/forms/InputEmail';
import InputPassword from '../../../../reusable/forms/InputPassword';
import InputText from '../../../../reusable/forms/InputText';

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
        resp.status === 400 ? toast.info(resp.data.message) : toast.error('Something Went Wrong!');
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
      toast.success('User updated successfully!');
      navigate('/admin/users/userList');
    } else {
      resp.status === 400 ? toast.info(resp.data.message) : toast.error('Something Went Wrong!');
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
                      <InputText
                        label={'Username'}
                        defaultValue={user?.username || null}
                        value={editedUser?.username}
                        handleInputChange={handleInputChange}
                      />
                    </div>
                    <div className='form-group col-md-6'>
                      <InputEmail
                        defaultValue={user?.email || null}
                        value={editedUser?.email}
                        handleInputChange={handleInputChange}
                      />
                    </div>

                    <div className='form-group col-md-6'>
                      <InputPassword
                        defaultValue={null}
                        value={editedUser?.password}
                        handleInputChange={handleInputChange}
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
