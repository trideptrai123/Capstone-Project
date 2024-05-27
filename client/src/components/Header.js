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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Header = () => {
  const [click, setClick] = useState(false);

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
      </ul>
    </nav>
  </header>
  );
};

export default Header;
