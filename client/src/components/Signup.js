import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Implement your signup logic here
    navigate('/login');
  };

  return (
    <div className='signup-container'>
      <form className='signup-form' onSubmit={handleSignup}>
        <h2>Sign Up</h2>
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
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
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
        <button type='submit' className='signup-button'>
          Sign Up
        </button>
        <p className='login-message'>
          Already registered?{' '}
          <button
            type='button'
            className='login-button'
            onClick={() => navigate('/login')}
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
