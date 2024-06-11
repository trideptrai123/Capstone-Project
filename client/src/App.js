import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar/Header';
import Footer from './components/Footer/Footer';
import { logout } from './redux/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      {!isAuthPage && <NavBar />}
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
