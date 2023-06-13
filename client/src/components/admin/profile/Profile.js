import React, { useState } from 'react';
import Layout from '../../common/Layout';

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('Nina Mcintire');
  const [height, setHeight] = useState('5.7');
  const [weight, setWeight] = useState('61');
  const [age, setAge] = useState('25');

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // Perform save/update logic here
  };

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
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className='form-control'
                      />
                    </>
                  ) : (
                    <h3 className='profile-username text-center'>{username}</h3>
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
                    <p className='text-muted text-center'>prince@yopmail.com</p>
                  )}

                  <ul className='list-group list-group-unbordered mb-3'>
                    <li className='list-group-item'>
                      <b>Height:</b>{' '}
                      {editMode ? (
                        <div className='input-group'>
                          <input
                            type='text'
                            value={height}
                            onChange={e => setHeight(e.target.value)}
                            className='form-control'
                          />
                          <div className='input-group-append'>
                            <span className='input-group-text'>feet</span>
                          </div>
                        </div>
                      ) : (
                        <span className='float-right'>{height} feet</span>
                      )}
                    </li>
                    <li className='list-group-item'>
                      <b>Weight:</b>{' '}
                      {editMode ? (
                        <div className='input-group'>
                          <input
                            type='text'
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            className='form-control'
                          />
                          <div className='input-group-append'>
                            <span className='input-group-text'>kg</span>
                          </div>
                        </div>
                      ) : (
                        <span className='float-right'>{weight} kg</span>
                      )}
                    </li>
                    <li className='list-group-item'>
                      <b>Age:</b>{' '}
                      {editMode ? (
                        <div className='input-group'>
                          <input
                            type='text'
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            className='form-control'
                          />
                          <div className='input-group-append'>
                            <span className='input-group-text'>year</span>
                          </div>
                        </div>
                      ) : (
                        <span className='float-right'>{age} year</span>
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
