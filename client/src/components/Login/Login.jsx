import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../loader/FormContainer';
import Loader from '../loader/Loader';
import { useLoginMutation } from '../../redux/usersApiSlice';
import { setCredentials } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import styles from './LoginScreen.module.css';
import 'tailwindcss/tailwind.css'; 

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
    <div className={`container mx-auto p-4 ${styles.container}`}>
      <div className={styles.formsContainer}>
        <div className={styles.signingSighup}>
          <form onSubmit={submitHandler} className={styles.signInForm}>
            <h2 className={styles.title}>Đăng nhập</h2>
            <div className={styles.inputField}>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              variant="primary"
              className={`${styles.btn} ${styles.transparent}`}
            >
              Đăng nhập
            </Button>
            {isLoading && <Loader className={styles.loader} />}

            <Row className="py-3">
            <Col className={styles.registerLink}>
              Người dùng mới?{' '}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Đăng ký
              </Link>
            </Col>
          </Row>
          </form>
         
        </div>
      </div>
      <div className={styles.panelsContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.content}>
            <h3>Ranking</h3>
            <p>.</p>
            <p>.</p>
            <p>.</p>
          </div>
          <img src="/log.svg" className={styles.image} alt="" />
        </div>
      </div>     
    </div>
  );
};

export default LoginScreen;
