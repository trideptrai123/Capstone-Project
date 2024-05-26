import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('university_student');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const checkUsernameExists = async (username) => {
    try {
      const response = await axios.post('http://localhost:4000/checkUsername', {
        username,
      });
      return response.data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post('http://localhost:4000/checkEmail', {
        email,
      });
      return response.data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const validate = async () => {
    const validationErrors = {};
    if (!username.trim()) {
      validationErrors.username = 'Username is required';
    } else if (await checkUsernameExists(username)) {
      validationErrors.username = 'Username already exists';
    }

    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email address is invalid';
    } else if (await checkEmailExists(email)) {
      validationErrors.email = 'Email already exists';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    return validationErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = await validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post('http://localhost:4000/Signup', {
        username,
        email,
        password,
        role,
      })
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
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <span className='error'>{errors.username}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className='error'>{errors.email}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className='error'>{errors.password}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            className='form-control'
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className='error'>{errors.confirmPassword}</span>
          )}
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
