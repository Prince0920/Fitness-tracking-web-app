import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Alexander Pierce
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
            <li className="nav-item">
              <Link
                to="/admin/dashboard"
                className={`nav-link ${
                  location.pathname == "/admin/dashboard" ? "active" : ""
                }`}
              >
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                  {/* <i className="right fas fa-angle-left" /> */}
                </p>
              </Link>
              {/* <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./index.html" className="nav-link active">
                        <i className="far fa-circle nav-icon" />
                        <p>Dashboard v1</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./index2.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Dashboard v2</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./index3.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Dashboard v3</p>
                      </a>
                    </li>
                  </ul> */}
            </li>
            <li className="nav-item">
              <Link
                to="/admin/apple"
                className={`nav-link ${
                  location.pathname == "/admin/apple" ? "active" : ""
                }`}
              >
                <i className="nav-icon fas fa-book" />
                <p>
                  Apple Watch
                  {/* <span className="right badge badge-danger">New</span> */}
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/fitbit"
                className={`nav-link ${
                  location.pathname == "/admin/fitbit" ? "active" : ""
                }`}
              >
                <i className="nav-icon fas fa-book" />
                <p>
                  Fitbit Watch
                  {/* <span className="right badge badge-danger">New</span> */}
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/dashboard"
                className={`nav-link disable ${
                  location.pathname == "/admin/sections" ? "active" : ""
                }`}
              >
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Sections
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              {/* <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>New Arrival</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Deal of the weak</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Most Popular books</p>
                  </Link>
                </li>
              </ul> */}
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
