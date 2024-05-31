import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../loader/FormContainer';
import Loader from '../loader/Loader';

import { useLoginMutation } from '../../redux/usersApiSlice';
import { setCredentials } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import styles from './LoginScreen.module.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer className={styles.formContainer}>
      <h1 className={styles.formTitle}>Đăng nhập</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className={`my-2 ${styles.formGroup}`} controlId='email'>
          <Form.Label className={styles.formLabel}>Email</Form.Label>
          <Form.Control
            className={styles.formControl}
            type='email'
            placeholder='Nhập email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className={`my-2 ${styles.formGroup}`} controlId='password'>
          <Form.Label className={styles.formLabel}>Mật khẩu</Form.Label>
          <Form.Control
            className={styles.formControl}
            type='password'
            placeholder='Nhập mật khẩu'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className={styles.submitButton}
        >
          Đăng nhập
        </Button>

        {isLoading && <Loader className={styles.loader} />}
      </Form>

      <Row className='py-3'>
        <Col className={styles.registerLink}>
          Người dùng mới?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Đăng ký
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
