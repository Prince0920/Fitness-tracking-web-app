import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser, getUsers } from '../../../../api/API';
import Layout from '../../../../reusable/layout/Layout';
import Loader from '../../../../reusable/loader/Loader ';

export const UserList = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const resp = await getUsers(token, page, pageSize);
      if (resp.status === 200) {
        setUsers(resp.data.data);
        console.log('resp.data.meta.totalRecords', resp.data.meta.totalRecord);
        setTotalRecords(resp.data.meta.totalRecord);
        setLoading(false);
      } else {
        resp.status === 400 ? toast.info(resp.data.message) : toast.error('Something Went Wrong!');
      }
    };
    fetchData();
  }, [token, page, pageSize]);

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const resp = await deleteUser(token, id);
      if (resp.status === 200) {
        // Remove the deleted user from the list
        const resp = await getUsers(token, page, pageSize);
        setUsers(resp.data.data);
        toast.success('User deleted successfully!');
      } else {
        resp.status === 400 ? toast.info(resp.data.message) : toast.error('Something Went Wrong!');
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
                {loading ? (
                  <Loader />
                ) : (
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
                                  <td>{pageSize * (page - 1) + index + 1}</td>
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
                    <div className='d-flex justify-content-end'>
                      <Pagination
                        showSizeChanger={false}
                        current={page}
                        defaultCurrent={1}
                        total={totalRecords}
                        pageSize={pageSize}
                        onChange={(page, pageSize) => {
                          setPage(page);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
