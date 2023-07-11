import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../reusable/layout/Footer';
import Header from '../reusable/layout/Header';
import Menu from '../reusable/layout/Menu';
import ProtectedRoute from './ProtectedRoute';

const Admin = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Menu />
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
      <Footer />
    </div>
  );
};

export default Admin;
