import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-light navbar-orange">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#">
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              AboutUs
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
        {/* SEARCH FORM */}
        {/* <form className="form-inline ml-3">
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-navbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </form> */}
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Notifications Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="fas fa-user-circle" />
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <div className="dropdown-divider" />
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                className="dropdown-item"
              >
                <i className="fas fa-sign-out-alt" />
                <span className="float-right text-muted text-sm">Logout</span>
              </Link>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i class="fas fa-users" />
                <span className="float-right text-muted text-sm">Profile</span>
              </a>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}
