import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdminRoute from './components/PrivateRoute/AdminRoute';
import LoginScreen from './components/Login/Login';
import RegisterScreen from './components/register/RegisterScreen';
import UserEditScreen from './components/admin/UserEditScreen';
import UserListScreen from './components/admin/UserListScreen';
import NewListScreen from './components/admin/NewListScreen';
import CreateUniversity from './components/admin/CreateUniversity';
import UniversityListScreen from './components/admin/UniversityListScreen';
import UniversityEditScreen from './components/admin/UniversityEditScreen';
import Home from './components/Home/HomePage';
import ProfilePage from './components/Profile/profilePage';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './utils/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route
          path='/admin/universitylist'
          element={<UniversityListScreen />}
        />
        <Route path='/admin/university' element={<CreateUniversity />} />
        <Route
          path='/admin/universityEdit/:id/edit'
          element={<UniversityEditScreen />}
        />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        <Route path='/admin/newList' element={<NewListScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
