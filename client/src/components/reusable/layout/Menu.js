import { AppleFilled, DashboardFilled, UserOutlined } from '@ant-design/icons';
import { Menu as AntMenu } from 'antd';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Menu.css';

const { SubMenu } = AntMenu;

const Menu = () => {
  const location = useLocation(); // Get the current location

  return (
    <aside
      className='main-sidebar sidebar-dark-primary elevation-4'
      style={{ background: 'black' }}>
      {/* Brand Logo */}
      <a
        href='index3.html'
        className='brand-link'>
        <img
          src='https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png'
          alt='AdminLTE Logo'
          className='brand-image img-circle elevation-3'
          style={{ opacity: '.8' }}
        />
        <span className='brand-text font-weight-light'>FitTrack</span>
      </a>
      {/* Sidebar */}
      <div className='sidebar'>
        {/* Sidebar user panel (optional) */}
        <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
          <div className='image'>
            <img
              src='https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg'
              className='img-circle elevation-2'
              alt='user'
            />
          </div>
          <div className='info'>
            <NavLink
              to='/admin/dashboard'
              className='d-block'
              activeClassName='active'>
              Dotsquare
            </NavLink>
          </div>
        </div>
        {/* Sidebar Menu */}
        <AntMenu
          mode='inline'
          theme='dark'
          defaultSelectedKeys={[location.pathname]} // Set the selected key based on the current location
          className='menu'>
          <AntMenu.Item
            key='/admin/dashboard'
            icon={<DashboardFilled />}
            style={{
              backgroundColor: location.pathname.includes('/admin/dashboard')
                ? '#fd7e14'
                : 'inherit',
              borderRadius: '0px',
            }}>
            <NavLink
              to='/admin/dashboard'
              activeClassName='active'
              exact
              style={{ color: 'white' }}>
              Dashboard
            </NavLink>
          </AntMenu.Item>

          <SubMenu
            key='sub1'
            icon={<UserOutlined />}
            title='Users'
            style={{
              backgroundColor: location.pathname.includes('/admin/users') ? '#fd7e14' : 'inherit',
              borderRadius: '0Px',
            }}>
            <AntMenu.Item key='/admin/users/userList'>
              <NavLink
                to='/admin/users/userList'
                activeClassName='active'>
                <span
                  style={{
                    color: location.pathname.includes('/admin/users/userList')
                      ? 'orange'
                      : 'inherit',
                  }}>
                  User List
                </span>
              </NavLink>
            </AntMenu.Item>
            <AntMenu.Item key='/admin/users/create'>
              <NavLink
                to='/admin/users/create'
                activeClassName='active'>
                <span
                  style={{
                    color: location.pathname.includes('/admin/users/create') ? 'orange' : 'inherit',
                  }}>
                  Create User
                </span>
              </NavLink>
            </AntMenu.Item>
          </SubMenu>

          <SubMenu
            key='sub2'
            icon={<AppleFilled />}
            title='Apple Watch'
            style={{
              backgroundColor: location.pathname.includes('/admin/apple') ? '#fd7e14' : 'inherit',
              borderRadius: '0Px',
            }}>
            <AntMenu.Item key='/admin/apple/dashboard'>
              <NavLink
                to='/admin/apple/dashboard'
                activeClassName='active'>
                <span
                  style={{
                    color: location.pathname.includes('/admin/apple/dashboard')
                      ? 'orange'
                      : 'inherit',
                  }}>
                  Dashboard
                </span>
              </NavLink>
            </AntMenu.Item>
          </SubMenu>

          <SubMenu
            key='sub3'
            icon={<i className='nav-icon fas fa-clock' />}
            title={'FitBit Watch'}
            style={{
              backgroundColor: location.pathname.includes('/admin/fitbit') ? '#fd7e14' : 'inherit',
              borderRadius: '0Px',
            }}>
            <AntMenu.Item key='/admin/fitbit/dashboard'>
              <NavLink
                to='/admin/fitbit/dashboard'
                activeClassName='active'>
                <span
                  style={{
                    color: location.pathname.includes('/admin/fitbit/dashboard')
                      ? 'orange'
                      : 'inherit',
                  }}>
                  Dashboard
                </span>
              </NavLink>
            </AntMenu.Item>
          </SubMenu>
        </AntMenu>
      </div>
    </aside>
  );
};

export default Menu;
