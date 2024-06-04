import React, { useEffect, useState } from 'react';
import {  Form, Button, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';
import { useProfileMutation } from '../../redux/usersApiSlice';
import { setCredentials } from '../../redux/authSlice';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState(''); 


  const { userInfo } = useSelector((state) => state.auth);



  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setUserType(userInfo.userType);
  }, [userInfo.email, userInfo.name, userInfo.userType]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
  
    
    if (!password || !confirmPassword) {
      toast.error('Please enter both password and confirm password');
      return; 
    }
  
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
          userType,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Row>
    <Col md={3}>
      <h2>Thông tin người dùng</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group className='my-2' controlId='userType'>
           <Form.Label>Loại người dùng</Form.Label>
           <Form.Control
             as='select'
             value={userType}
             onChange={(e) => setUserType(e.target.value)}
           >
            <option value='Student university'>Student university</option>
            <option value='High school student'>High school student </option>
           </Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type='password'
            placeholder='Nhập mật khẩu mới'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Xác nhận mật khẩu</Form.Label>
          <Form.Control
            type='password'
            placeholder='Xác nhận mật khẩu mới'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Cập nhật
        </Button>
        {loadingUpdateProfile && <Loader />}
      </Form>
    </Col>
    </Row>
  );
};

export default ProfilePage;