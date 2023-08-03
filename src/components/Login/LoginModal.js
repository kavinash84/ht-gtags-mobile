import React from 'react';
import LoginBtn from './LoginBtn';

const styles = require('./Login.scss');

const LoginScroll = () => (
  <div className={styles.loginContainer}>
    <LoginBtn />
  </div>
);

export default LoginScroll;
