import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser, getUsers } from '../../utils/API';
import Layout from '../common/Layout';

export const UserList = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userList = await getUsers(token);
      setUsers(userList.data);
    };
    fetchData();
  }, [token]);

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const data = await deleteUser(token, id);
      if (data) {
        toast('User deleted successfully!');
        // Remove the deleted user from the list
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      } else {
        toast('Something went wrong!');
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
