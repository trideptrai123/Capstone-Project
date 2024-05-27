import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleButton } from 'react-google-button';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, googleSignIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });
      if (response.data.token) {
        login(response.data.token, response.data.user);
        navigate('/');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control'
            required
            value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='login-button'>
          Login
        </button>
        <div className='signup-google'>
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
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
