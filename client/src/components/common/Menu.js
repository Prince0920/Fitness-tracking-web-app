import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const location = useLocation();
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
              alt='User Image'
            />
          </div>
          <div className='info'>
            <a
              href='#'
              className='d-block'>
              Dotsquare
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className='mt-2'>
          <ul
            className='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'>
            {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
            <li className='nav-item'>
              <Link
                to='/admin/dashboard'
                className={`nav-link ${location.pathname == '/admin/dashboard' ? 'active' : ''}`}>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Dashboard
                  {/* <i className="right fas fa-angle-left" /> */}
                </p>
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/admin/users/userList'
                className={`nav-link ${
                  location.pathname.startsWith('/admin/users') ? 'active' : ''
                }`}>
                <i class='nav-icon fas fa-users'></i>
                <p>
                  Users
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link
                    to='/admin/users/userList'
                    className={`nav-link ${
                      location.pathname == '/admin/users/userList' ? 'active' : ''
                    }`}>
                    <i className='far fa-circle nav-icon' />
                    <p>User List</p>
                  </Link>
                </li>
              </ul>
            </li>

            <li className='nav-item'>
              <Link
                to='/admin/apple/dashboard'
                className={`nav-link ${
                  location.pathname.startsWith('/admin/apple') ? 'active' : ''
                }`}>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Apple Watch
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link
                    to='/admin/apple/dashboard'
                    className={`nav-link ${
                      location.pathname == '/admin/apple/dashboard' ? 'active' : ''
                    }`}>
                    <i className='far fa-circle nav-icon' />
                    <p>Dashboard</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <Link
                to='/admin/fitbit/dashboard'
                className={`nav-link ${
                  location.pathname.startsWith('/admin/fitbit') ? 'active' : ''
                }`}>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  FitBit Watch
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link
                    to='/admin/apple/dashboard'
                    className={`nav-link ${
                      location.pathname == '/admin/fitbit/dashboard' ? 'active' : ''
                    }`}>
                    <i className='far fa-circle nav-icon' />
                    <p>Dashboard</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default Menu;
