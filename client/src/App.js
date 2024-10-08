import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Sample from './Sample';
import EditUser from './components/pages/app/admin/usersList/EditUser';
import { UserList } from './components/pages/app/admin/usersList/UserList';
import { Apple } from './components/pages/app/apple/Apple';
import Dashboard from './components/pages/app/dashboard/Dashboard';
import Fitbit from './components/pages/app/fitbit/Fitbit';
import ProfilePage from './components/pages/app/profile/Profile';
import LandingPage from './components/pages/landing/Home/LandingPage';
import ForgotPassword from './components/pages/landing/auth/ForgotPassword';
import Login from './components/pages/landing/auth/Login';
import Register from './components/pages/landing/auth/Register';
import ResetPassword from './components/pages/landing/auth/ResetPassword';
import Admin from './components/routing/Admin';
import CreateUser from './components/pages/app/admin/usersList/CreateUser';
import ContactUs from './components/pages/app/contactUs/ContactUs';

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
            path='contactUs'
            element={<ContactUs />}
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
            path='users/create'
            element={<CreateUser />}
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
