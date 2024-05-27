import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/img/logo512.png';

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <nav className='nav-bar'>
        <p>
          <img src={logo} alt='logo' />
        </p>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/contact-us'>Contact US</a>
          </li>
          <li>
            <a href='/contact-us'>New</a>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <p>Hi, {user?.displayName || user?.email}</p>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
