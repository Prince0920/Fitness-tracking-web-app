import React from "react";
import { Link } from "react-router-dom";

const Layout = (props) => {
  const { heading, item } = props;
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">{heading}</h1>
          </div>
          {/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <Link to='/admin/books'>Home</Link>
              </li>
              <li className="breadcrumb-item active">{item}</li>
            </ol>
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container-fluid */}
    </div>
  );
};

export default Layout;
