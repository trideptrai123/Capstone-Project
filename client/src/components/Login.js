import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../slice/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate('/');
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
