import React, { useEffect, useState } from 'react';
import Layout from '../../common/Layout';
import { getProfile, updateProfile } from '../../../utils/API';

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileDetail, setProfileDetail] = useState({
    email: '',
    username: '',
    height: '',
    weight: '',
    age: '',
  });
  const token = localStorage.getItem('token');
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const profileBody = profileDetail;
    delete profileBody.email;
    const { data } = await updateProfile(profileBody, token);
    setProfileDetail({
      email: data.email,
      username: data.username,
      height: data.height,
      weight: data.weight,
      age: data.age,
    });
    setEditMode(false);
    // Perform save/update logic here
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfileDetail(prevProfileDetail => ({
      ...prevProfileDetail,
      [name]: value,
    }));
  };

  useEffect(async () => {
    const { data } = await getProfile(token);
    setProfileDetail({
      email: data.email,
      username: data.username,
      height: data.height,
      weight: data.weight,
      age: data.age,
    });
  }, []);
  return (
    <div className='content-wrapper'>
      <Layout
        heading='Profile'
        item='profile'
      />
      <section className='content'>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <div className='card card-primary card-outline'>
                <div className='card-body box-profile'>
                  <div className='text-center'>
                    <img
                      className='profile-user-img img-fluid img-circle'
                      src='https://adminlte.io/themes/v3/dist/img/user1-128x128.jpg'
                      alt='User profile picture'
                    />
                  </div>
                  {editMode ? (
                    <>
                      <b>Username:</b>
                      <input
                        type='text'
                        name='username'
                        value={profileDetail.username}
                        onChange={handleInputChange}
                        className='form-control'
                      />
                    </>
                  ) : (
                    <h3 className='profile-username text-center'>{profileDetail.username}</h3>
                  )}

                  {editMode ? (
                    <>
                      <b>Email:</b>
                      <input
                        type='text'
                        value='prince@yopmail.com'
                        className='form-control'
                        readOnly
                      />
                    </>
                  ) : (
                    <p className='text-muted text-center'>{profileDetail.email}</p>
                  )}

                  <ul className='list-group list-group-unbordered mb-3'>
                    <li className='list-group-item'>
                      <b>Height:</b>{' '}
                      {editMode ? (
                        <div className='input-group'>
                          <input
                            type='number'
                            name='height'
                            value={profileDetail.height}
                            onChange={handleInputChange}
                            className='form-control'
                          />
                          <div className='input-group-append'>
                            <span className='input-group-text'>feet</span>
                          </div>
                        </div>
                      ) : (
                        <span className='float-right'>{profileDetail.height} feet</span>
                      )}
                    </li>
                    <li className='list-group-item'>
                      <b>Weight:</b>{' '}
                      {editMode ? (
                        <div className='input-group'>
                          <input
                            type='number'
                            name='weight'
                            value={profileDetail.weight}
                            onChange={handleInputChange}
                            className='form-control'
                          />
                          <div className='input-group-append'>
                            <span className='input-group-text'>kg</span>
                          </div>
                        </div>
                      ) : (
                        <span className='float-right'>{profileDetail.weight} kg</span>
                      )}
                    </li>
                    <li className='list-group-item'>
                      <b>Age:</b>{' '}
                      {editMode ? (
                        <div className='input-group'>
                          <input
                            type='number'
                            name='age'
                            value={profileDetail.age}
                            onChange={handleInputChange}
                            className='form-control'
                          />
                          <div className='input-group-append'>
                            <span className='input-group-text'>year</span>
                          </div>
                        </div>
                      ) : (
                        <span className='float-right'>{profileDetail.age} year</span>
                      )}
                    </li>
                  </ul>
                  {editMode ? (
                    <button
                      className='btn btn-primary btn-block'
                      onClick={handleSaveClick}>
                      <b>Save</b>
                    </button>
                  ) : (
                    <button
                      className='btn btn-primary btn-block'
                      onClick={handleEditClick}>
                      <b>Update Profile</b>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
