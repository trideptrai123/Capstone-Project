import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../slice/AuthContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/User', { username, password })
      .then((result) => {
        console.log(result);
        if (result.data === 'Success') {
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            className='form-control'
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='login-button'>
          Login
        </button>
        <p className='signup-message'>
          Not registered?{' '}
          <button
            type='button'
            className='signup-button'
            onClick={() => navigate('/signup')}
          >
            Sign up here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
