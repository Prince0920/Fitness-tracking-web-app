import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../common/Layout';

export const UserList = () => {
  return (
    <div className='content-wrapper'>
      <Layout
        heading='User List'
        item='userList'
      />
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='card'>
                {/* <div className='card-header'>
                  <h3 className='card-title'>Bordered Table</h3>
                </div> */}
                <div className='card-body'>
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th style={{ width: 250 }}>Username</th>
                        <th style={{ width: 400 }}>Email</th>
                        <th>Password</th>
                        <th style={{ width: 80 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>Prince Agrawal</td>
                        <td>prince@youpmail.com</td>
                        <td>********</td>
                        <td>
                          <span className='badge bg-warning'>
                            <i class='fas fa-edit'></i>
                          </span>
                          {'  '}
                          <span className='badge bg-danger'>
                            <i class='fas fa-trash'></i>
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td>2.</td>
                        <td>Prince Agrawal</td>
                        <td>prince@youpmail.com</td>
                        <td>********</td>
                        <td>
                          <span className='badge bg-warning'>
                            <i class='fas fa-edit'></i>
                          </span>
                          {'  '}
                          <span className='badge bg-danger'>
                            <i class='fas fa-trash'></i>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>Prince Agrawal</td>
                        <td>prince@youpmail.com</td>
                        <td>********</td>
                        <td>
                          <span className='badge bg-warning'>
                            <i class='fas fa-edit'></i>
                          </span>
                          {'  '}
                          <span className='badge bg-danger'>
                            <i class='fas fa-trash'></i>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
