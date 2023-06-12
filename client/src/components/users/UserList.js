import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../common/Layout';

export const UserList = () => {
  useEffect(() => {
    // Canvas rendering fix
    const knobs = document.getElementsByClassName('knob');
    if (knobs.length > 0) {
      window.$(knobs).knob();
    }
  }, []);

  return (
    <div className='content-wrapper'>
      <Layout
        heading='User List'
        item='userList'
      />
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            User List
          </div>
        </div>
      </section>
    </div>
  );
};
