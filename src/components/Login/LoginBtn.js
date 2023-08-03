import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';

const styles = require('./Login.scss');

const LoginBtn = () => (
  <div className={styles.loginBtn}>
    <Row display="block" mr="0" ml="0">
      <Div col="6" className={styles.block} p="5px 0">
        <Link to="/login" className={styles.btn}>
          LOG IN
        </Link>
      </Div>
      <Div col="6">
        <Link to="/signup" className={styles.btn}>
          SIGN UP
        </Link>
      </Div>
    </Row>
    <Row display="block" m="10px 0">
      <Div col="12">
        <div className={styles.loginWith}>
          <label p="10px 20px" bg="#FFF" fontSize="1.25em">
            or login with
          </label>
        </div>
      </Div>
    </Row>
    <Row display="block" mr="0" ml="0">
      <Div col="12">
        <Button pd="0" bg="transparent" border="none" className={styles.socialBtn}>
          GOOGLE
        </Button>
      </Div>
    </Row>
  </div>
);

export default LoginBtn;
