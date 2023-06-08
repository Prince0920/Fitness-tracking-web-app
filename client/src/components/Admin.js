import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Menu from "./common/Menu";
import ProtectedRoute from "./utils/ProtectedRoute";

const Admin = () => {
  return (
    <div class="wrapper">
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
