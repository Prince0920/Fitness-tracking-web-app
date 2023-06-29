import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser, getUsers } from '../../../../../utils/API';
import Layout from '../../../../reusable/layout/Layout';

export const UserList = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getUsers(token);
      if (resp.status === 200) {
        setUsers(resp.data);
      } else {
        resp.status === 400 ? toast(resp.data.message) : toast('Something Went Wrong!');
      }
    };
    fetchData();
  }, [token]);

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const resp = await deleteUser(token, id);
      if (resp.status === 200) {
        // Remove the deleted user from the list
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        toast('User deleted successfully!');
      } else {
        resp.status === 400 ? toast(resp.data.message) : toast('Something Went Wrong!');
      }
    }
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
                <div className='card-body'>
                  <div className='table-responsive'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th style={{ width: '10%' }}>#</th>
                          <th style={{ width: '25%' }}>Username</th>
                          <th style={{ width: '30%' }}>Email</th>
                          <th style={{ width: '25%' }}>Password</th>
                          <th style={{ width: '10%' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length ? (
                          users.map((user, index) => {
                            return (
                              <tr key={index}>
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
                                    <i className='fas fa-edit'></i>
                                  </span>{' '}
                                  <span
                                    className='badge bg-danger'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                      handleDelete(user._id);
                                    }}>
                                    <i className='fas fa-trash'></i>
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan='5'>No user found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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
