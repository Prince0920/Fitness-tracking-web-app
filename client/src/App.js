import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import { Apple } from "./components/apple/Apple";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Fitbit } from "./components/fitbit/Fitbit";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="apple" element={<Apple />} />
          <Route path="fitbit" element={<Fitbit />} />

          <Route path="*" element={<Navigate to={"/admin/dashboard"} />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/forgotPassword" element={<ForgotPassword />} />
        <Route path="/passwordReset" element={<ResetPassword />} />

        <Route path="*" element={<Navigate to={"/admin/dashboard"} />} />
      </Routes>
    </div>
  );
}

export default App;
