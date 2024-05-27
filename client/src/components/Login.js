import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../slice/AuthContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/login', { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === 'Success') {
          login();
          navigate('/');
        } else {
          console.log(result.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className='form-group'>
          <label htmlFor='username'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control'
            required
            onChange={(e) => setEmail(e.target.value)}
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
