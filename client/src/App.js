import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Admin from './components/Admin';
import { Apple } from './components/apple/Apple';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Fitbit } from './components/fitbit/Fitbit';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import { UserList } from './components/users/UserList';
import ProfilePage from './components/admin/profile/Profile';
import EditUser from './components/users/EditUser';
import Dashboard from './components/Dashboard/Dashboard';
import Sample from './Sample';
import LandingPage from './components/pages/landing/Home/LandingPage';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
          path='/admin'
          element={<Admin />}>
          <Route
            path='dashboard'
            element={<Dashboard />}
          />
          <Route
            path='profile'
            element={<ProfilePage />}
          />
          <Route
            path='apple/dashboard'
            element={<Apple />}
          />
          <Route
            path='fitbit/dashboard'
            element={<Fitbit />}
          />
          <Route
            path='users/userList'
            element={<UserList />}
          />
          <Route
            path='users/edit/:id'
            element={<EditUser />}
          />
          <Route
            path='sample'
            element={<Sample />}
          />

          <Route
            path='*'
            element={<Navigate to={'/admin/dashboard'} />}
          />
        </Route>

        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/forgotPassword'
          element={<ForgotPassword />}
        />
        <Route
          path='/passwordReset'
          element={<ResetPassword />}
        />
        <Route
          path='/'
          element={<LandingPage />}
        />

        <Route
          path='*'
          element={<Navigate to={'/admin/dashboard'} />}
        />
      </Routes>
    </div>
  );
}

export default App;
