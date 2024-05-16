import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState('university_student'); // Default role
  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    // Implement your signup logic here
    axios
      .post('http://localhost:4000/User', {
        username,
        email,
        password,
        role,
      }) // Replace '/api/signup' with your actual API endpoint
      .then((result) => {
        console.log(result);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
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
            onChange={(e) => setUsername(e.target.value)}
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
        <div className='form-group'>
          <label htmlFor='role'>Role:</label>
          <select
            id='role'
            name='role'
            className='form-control'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value='university_student'>University Student</option>
            <option value='high_school_student'>High School Student</option>
          </select>
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
