import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Menu from 'components/OtherMenu';
import ForgotPasswordForm from 'hometown-components/lib/Forms/ForgotPasswordForm';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Button from 'hometown-components/lib/Buttons';
import Theme from 'hometown-components/lib/Theme';
import Span from 'hometown-components/lib/Span';
import Text from 'hometown-components/lib/Text';
import { validateEmail } from 'js-utility-functions';
import { forgotPassword } from 'redux/modules/forgotpassword';
import { LOGIN_URL } from 'helpers/Constants';
import { Link } from 'react-router-dom';
import { BASE_IMAGE_URL } from "helpers/Constants";

@connect(({ forgotpassword }) => ({
  response: forgotpassword
}))
@withRouter
export default class ForgotPasswordFormContainer extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    email: '',
    emailError: false,
    emailErrorMessage: '',
    submitted: false
  };
  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = validateEmail(value, 'Enter valid email');
    this.setState({
      email: value,
      emailError: checkError.error,
      emailErrorMessage: checkError.error ? checkError.errorMessage : ''
    });
  };
  onSubmitForgot = e => {
    e.preventDefault();
    const { email } = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    if (checkEmail.error) {
      return this.setState({
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage
      });
    }
    this.setState({ submitted: true });
    const { dispatch } = this.context.store;
    dispatch(forgotPassword(email));
  };
  render() {
    const styles = require('./index.scss');

    const {
      email, emailError, emailErrorMessage, submitted
    } = this.state;
    const { response } = this.props;
    const { loaded, error } = response;
    return (
      <div className={styles.forgotWrapper}>
        <Menu />
        <Section bg="bg" mb="0" p="1.25rem" mt="5px" pt="1.5rem" pb="1.5rem" height="calc(100vh - 54px)">
          {loaded && !error && submitted ? (
            <div className={`${styles.responseBlock}`}>
              <Img height="150px" src={`${BASE_IMAGE_URL}/media/cms/extras/forgot-password-icon.png`} alt="" m="0 auto 1rem" />
              <Row display="block" mr="0" ml="0">
                <Div mt="0">
                  <div className={styles.content}>
                    <Text ta="center" fontSize="16px">
                      An email has been sent to <br />
                      <b>{email}</b>
                    </Text>
                    <Text ta="center" fontSize="14px">
                      Please follow the instructions to reset your password
                    </Text>
                  </div>
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0" mt="1rem">
                <Div col="6" pr="5px">
                  <Button
                    type="button"
                    btnType="custom"
                    size="block"
                    p=".5rem 2rem"
                    bg={Theme.colors.mkPrimary}
                    color="white"
                    onClick={this.handleModal}
                  >
                    <Link to="/login">
                      <Span color="white">Login</Span>
                    </Link>
                  </Button>
                </Div>
                <Div col="6" pl="5px">
                  <Button
                    type="button"
                    size="block"
                    btnType="custom"
                    p=".5rem 2rem"
                    bg={Theme.colors.mkPrimary}
                    color="white"
                    onClick={this.handleModal}
                  >
                    <Link to="/">
                      <Span color="white">Go Back Home</Span>
                    </Link>
                  </Button>
                </Div>
              </Row>
            </div>
          ) : (
            <div>
              <Row display="block" mr="0" ml="0">
                <Div col="6">
                  <Heading mt="0" mb="0" color="textDark" fontSize="1.25em">
                    Forgot Password
                  </Heading>
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0">
                <Div mt="1.25rem">
                  <ForgotPasswordForm
                    email={email}
                    onChangeEmail={this.onChangeEmail}
                    emailFeedBackError={emailError}
                    emailFeedBackMessage={emailErrorMessage}
                    onSubmitForgot={this.onSubmitForgot}
                    forgotResponse={response}
                    loginUrl={LOGIN_URL}
                  />
                </Div>
              </Row>
            </div>
          )}
        </Section>
      </div>
    );
  }
}
