import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../common/Layout';
import { deleteUser, getUsers } from '../../utils/API';

export const UserList = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const userList = await getUsers(token);
    setUsers(userList.data);
  }, []);

  async function handleDelete(id) {
    alert('Confirm you want to delete...');
    const data = await deleteUser(token, id);

    // const arr = users;
    // const objWithIdIndex = arr.findIndex(obj => obj._id === id);
    // if (objWithIdIndex > -1) {
    //   arr.splice(objWithIdIndex, 1);
    // }
    // setUsers(arr);
  }

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
                      {users.length ? (
                        users.map((user, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>********</td>
                              <td>
                                <span
                                  className='badge bg-warning'
                                  onClick={() => {
                                    navigate(`/admin/users/edit/${user._id}`);
                                  }}
                                  style={{ cursor: 'pointer' }}>
                                  <i class='fas fa-edit'></i>
                                </span>
                                {'  '}
                                <span
                                  className='badge bg-danger'
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    handleDelete(user._id);
                                  }}>
                                  <i class='fas fa-trash'></i>
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <>No user found</>
                      )}
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
