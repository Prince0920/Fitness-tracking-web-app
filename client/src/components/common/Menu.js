import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
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
        <nav className='mt-2'>
          <ul
            className='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'>
            <li className='nav-item'>
              <NavLink
                to='/admin/dashboard'
                className='nav-link'
                activeClassName='active'
                exact={true}>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink
                to='/admin/users/userList'
                className='nav-link'
                activeClassName='active'>
                <i className='nav-icon fas fa-users' />
                <p>
                  Users
                  <i className='right fas fa-angle-left' />
                </p>
              </NavLink>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <NavLink
                    to='/admin/users/userList'
                    className='nav-link'
                    activeClassName='active'>
                    <i className='far fa-circle nav-icon' />
                    <p>User List</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='nav-item'>
              <NavLink
                to='/admin/apple/dashboard'
                className='nav-link'
                activeClassName='active'>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Apple Watch
                  <i className='right fas fa-angle-left' />
                </p>
              </NavLink>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <NavLink
                    to='/admin/apple/dashboard'
                    className='nav-link'
                    activeClassName='active'>
                    <i className='far fa-circle nav-icon' />
                    <p>Dashboard</p>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/admin/fitbit/dashboard'
                className='nav-link'
                activeClassName='active'>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  FitBit Watch
                  <i className='right fas fa-angle-left' />
                </p>
              </NavLink>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <NavLink
                    to='/admin/fitbit/dashboard'
                    className='nav-link'
                    activeClassName='active'>
                    <i className='far fa-circle nav-icon' />
                    <p>Dashboard</p>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Menu;
