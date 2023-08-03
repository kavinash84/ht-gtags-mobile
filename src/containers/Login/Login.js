import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';
import Menu from 'components/OtherMenu';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import LoginForm from 'hometown-components/lib/Forms/LoginForm';
// import Text from 'hometown-components/lib/Text';
// import FormInput from 'hometown-components/lib/Forms/FormInput';
// import ResponsiveModal from 'components/Modal';
import Section from 'hometown-components/lib/Section';
import { Label } from 'hometown-components/lib/Label';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Button from 'hometown-components/lib/Buttons';
import GoogleLoginBtn from 'components/Login/GoogleLogin';
import { validateEmail, isBlank } from 'js-utility-functions';
import { FORGOT_PASSWORD_URL, SIGNUP_URL } from 'helpers/Constants';
import { login, getOtp, resendOtp, birthdateCheck, clearLoginState } from 'redux/modules/login';
import { validateMobile, isEmpty, validateName, validateDob } from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';

import LoginViaOtp from './LoginViaOtp';
import UpdateProfileModal from './UpdateProfile';

const LoaderIcon = require('../../../static/refresh.svg');
const OTPIcon = require('../../../static/otp.svg');
const EmailIcon = require('../../../static/email-primary.svg');

@connect(state => ({
  loginResponse: state.userLogin,
  router: state.router,
  getotpError: state.userLogin.otpError,
  getotpErrorMessage: state.userLogin.errorMessage,
  otpSent: state.userLogin.otpSent,
  loaded: state.userLogin.loaded,
  loading: state.userLogin.loading,
  loggingIn: state.userLogin.loggingIn,
  askContact: state.userLogin.askContact,
  askBirthDate: state.userLogin.askBirthDate,
  askEmail: state.userLogin.askEmail,
  askName: state.userLogin.askName,
  skipBirthdateCheck: state.userLogin.skipBirthdateCheck,
  loginType: state.userLogin.loginType
}))
@withRouter
export default class LoginFormContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static propTypes = {
    loginResponse: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired
    }).isRequired,
    getotpError: PropTypes.bool,
    getotpErrorMessage: PropTypes.string,
    otpSent: PropTypes.bool,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    loggingIn: PropTypes.bool,
    askContact: PropTypes.bool,
    askBirthDate: PropTypes.bool,
    skipBirthdateCheck: PropTypes.bool,
    askEmail: PropTypes.bool,
    askName: PropTypes.bool,
    loginType: PropTypes.string
  };

  static defaultProps = {
    otpSent: false,
    getotpError: false,
    getotpErrorMessage: '',
    loaded: false,
    loading: false,
    loggingIn: false,
    askContact: false,
    askBirthDate: false,
    skipBirthdateCheck: false,
    askEmail: false,
    askName: false,
    loginType: ''
  };

  state = {
    email: '',
    emailError: false,
    emailErrorMessage: '',
    password: '',
    passwordError: false,
    passwordErrorMessage: '',
    loginviaotp: false,
    mobile: '',
    otp: '',
    otpErrorMessage: 'OTP Should be 6 Characters',
    mobilesubmitted: false,
    resend: false,
    phone: '',
    phoneError: false,
    phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
    dob: '',
    dobError: false,
    dobErrorMessage: 'Enter Valid Date',
    name: '',
    nameError: false,
    nameErrorMessage: 'Enter a valid name, without special characters !'
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
  onChangePassword = e => {
    const {
      target: { value }
    } = e;
    const checkError = isBlank(value);
    this.setState({
      password: value,
      passwordError: checkError,
      passwordErrorMessage: checkError ? "Password can't be blank" : ''
    });
  };
  onSubmitLogin = (e, skipBirthdateCheck = false) => {
    e.preventDefault();
    const { email, password, phone, name, dob } = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    const checkMobile = phone ? !validateMobile(phone) : false;
    const checkDob = dob ? validateDob(dob).error : false;
    const checkName = !isEmpty(name) ? validateName(name) : false;
    const checkPassword = isBlank(password);
    if (checkEmail.error || checkPassword || checkMobile || checkName || checkDob) {
      return this.setState({
        nameError: checkName,
        nameErrorMessage: validateName(name).msg,
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage,
        passwordError: checkPassword,
        passwordErrorMessage: checkPassword ? "Password can't be blank" : '',
        dobError: checkDob,
        dobErrorMessage: checkDob ? "Date of birth can't be blank" : ''
      });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipBirthdateCheck,
      skipOtpValidation: false,
      dob: dob ? moment(dob).format('YYYY-MM-DD') : ''
    };
    dispatch(login(data));
  };
  toggleLoginForm = () => {
    const { dispatch } = this.context.store;
    this.setState({
      loginviaotp: !this.state.loginviaotp,
      resend: false,
      mobilesubmitted: false,
      otp: '',
      otpError: false,
      email: '',
      password: ''
    });
    dispatch(clearLoginState());
  };
  onChangeMobile = e => {
    const { value } = e.target;
    const checkError = !validateMobile(value);
    if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      mobile: value,
      mobileError: checkError,
      mobileErrorMessage:
        value[0] === '0' ? 'Mobile Number Must Not Start With 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangeName = e => {
    const { value } = e.target;
    const nameCheck = validateName(value).error;
    this.setState({
      name: value,
      nameError: nameCheck,
      nameErrorMessage: validateName(value).msg
    });
  };
  onChangeOtp = e => {
    const { value } = e.target;
    if (!allowNChar(value, 6) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      otp: value,
      otpError: false
    });
  };
  onSubmitMobileNumber = e => {
    e.preventDefault();
    const { mobile, resend } = this.state;
    const checkmobile = !validateMobile(mobile);
    if (checkmobile) {
      return this.setState({
        mobileError: true,
        mobileErrorMessage: 'Please Enter Valid Mobile Number'
      });
    }
    const { dispatch } = this.context.store;
    if (resend) {
      return dispatch(resendOtp(this.state.mobile));
    }
    dispatch(getOtp(this.state.mobile));
  };
  onSubmitOtp = e => {
    e.preventDefault();
    const { otp } = this.state;
    if (otp.length < 6) {
      return this.setState({
        otpError: true
      });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true
    };
    dispatch(login(data));
  };
  onSubmitName = e => {
    e.preventDefault();
    const { name } = this.state;
    const isInvalid = validateName(name).error;
    if (isInvalid) {
      return this.setState({
        nameError: true,
        nameErrorMessage: validateName(name).msg
      });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true
    };
    dispatch(login(data));
  };
  onSubmitNameAndEmail = e => {
    e.preventDefault();
    const { name, email } = this.state;
    const checkEmail = !validateEmail(email);
    const checkName = validateName(name).error;
    if (checkName) {
      return this.setState({
        nameError: true,
        nameErrorMessage: validateName(name).msg
      });
    }

    if (checkEmail) {
      return this.setState({ emailError: checkEmail });
    }

    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true
    };
    dispatch(login(data));
  };
  onSubmitEmail = e => {
    e.preventDefault();
    const { email } = this.state;
    const checkEmail = !validateEmail(email);

    if (checkEmail) {
      return this.setState({ emailError: checkEmail });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true
    };
    dispatch(login(data));
  };
  handleResend = () => {
    this.setState({
      mobilesubmitted: false,
      resend: true
    });
  };
  componentWillReceiveProps(nextProps) {
    if (!this.state.mobilesubmitted && nextProps.getotpError && nextProps.getotpErrorMessage.includes('resend')) {
      this.setState({
        mobilesubmitted: true
      });
    }
    if (nextProps.otpSent && nextProps.otpSent !== this.props.otpSent) {
      this.setState({
        mobilesubmitted: true
      });
    }
  }
  onChangePhone = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateMobile(value);
    if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      phone: value,
      phoneError: checkError,
      phoneErrorMessage:
        value[0] === '0' ? 'Mobile Number Must Not Start With 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangeDob = value => {
    const checkError = validateDob(value).error;
    const newDob = moment(value, 'DD-MM-YYYY').toDate();
    const currentDate = `${new Date().toJSON().slice(0, 10)} 01:00:00`;
    const myAge = Math.floor((Date.now(currentDate) - newDob) / 31557600000);

    if (myAge > 9) {
      this.setState({
        dob: value,
        dobError: checkError
      });
    } else {
      this.setState({
        dob: value,
        dobError: checkError,
        dobErrorMessage: 'Wallet user can not be less than 10 years old'
      });
    }
  };
  onSubmitDob = () => {
    const { dob } = this.state;
    const isInvalid = validateDob(dob).error;
    if (isInvalid) {
      return this.setState({
        nameError: true,
        nameErrorMessage: validateDob(dob).msg
      });
    }
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipOtpValidation: true,
      dob: moment(dob).format('YYYY-MM-DD')
    };
    dispatch(login(data));
  };
  onSkipDob = () => {
    this.birthdateCheck(true);
    const { dispatch } = this.context.store;
    const data = {
      ...this.state,
      skipBirthdateCheck: true,
      skipOtpValidation: true,
      dob: ''
    };
    dispatch(login(data));
  };
  birthdateCheck = status => {
    const { dispatch } = this.context.store;
    dispatch(birthdateCheck(status));
  };
  handleModal = () => {
    const { dispatch } = this.context.store;
    dispatch(clearLoginState());
  };
  isValid = () => {
    const { askContact, askName, askBirthDate } = this.props;
    const { phone, name, dob } = this.state;
    const isInvalidPhone = askContact && !validateMobile(phone);
    const isInvalidName = askName && validateName(name).error;
    const isInvalidDob = askBirthDate && validateDob(dob).error;
    const disabled = isInvalidPhone || isInvalidName || isInvalidDob;
    return disabled;
  };
  render() {
    const styles = require('./index.scss');

    const {
      email,
      password,
      emailError,
      emailErrorMessage,
      passwordError,
      passwordErrorMessage,
      phone,
      phoneError,
      phoneErrorMessage,
      dob,
      dobError,
      dobErrorMessage,
      name,
      nameError,
      nameErrorMessage
    } = this.state;
    const {
      mobile,
      mobileError,
      mobileErrorMessage,
      otp,
      otpError,
      otpErrorMessage,
      mobilesubmitted,
      resend
    } = this.state;
    const {
      loginResponse,
      loaded,
      loading,
      loggingIn,
      askContact,
      askName,
      askEmail,
      askBirthDate,
      skipBirthdateCheck,
      loginType
    } = this.props;
    const open = (askContact || askName || askBirthDate) && loginType && loginType === 'hometown';
    const isValidField = this.isValid();
    return (
      <div className={styles.loginWrapper}>
        <Menu />
        <Section bg="bg" mb="0" p="1.25rem" mt="5px" pt="1.5rem" pb="1.5rem" height="calc(100vh - 54px)">
          <Row display="block" mr="0" ml="0">
            <Div col="12">
              <Heading fontFamily="light" mt="0" mb="0" pb="2px" color="textDark" fontSize="1.25em">
                Login
              </Heading>
            </Div>
          </Row>
          <Row display="block" mr="0" ml="0" mb="1.5rem">
            <Div mt="1rem">
              {!this.state.loginviaotp ? (
                <div>
                  <LoginForm
                    email={email}
                    onChangeEmail={this.onChangeEmail}
                    emailFeedBackError={emailError}
                    emailFeedBackMessage={emailErrorMessage}
                    password={password}
                    onChangePassword={this.onChangePassword}
                    passwordFeedBackError={passwordError}
                    passwordFeedBackMessage={passwordErrorMessage}
                    onSubmitLogin={this.onSubmitLogin}
                    loginResponse={loginResponse}
                    forgotUrl={FORGOT_PASSWORD_URL}
                    signupUrl={SIGNUP_URL}
                  />
                  <UpdateProfileModal
                    askName={askName}
                    askContact={askContact}
                    askBirthDate={askBirthDate}
                    skipBirthdateCheck={skipBirthdateCheck}
                    open={open}
                    name={name}
                    nameError={nameError}
                    nameErrorMessage={nameErrorMessage}
                    phone={phone}
                    phoneError={phoneError}
                    phoneErrorMessage={phoneErrorMessage}
                    dob={dob}
                    dobError={dobError}
                    dobErrorMessage={dobErrorMessage}
                    isValidField={isValidField}
                    loggingIn={loggingIn}
                    LoaderIcon={LoaderIcon}
                    handleModal={this.handleModal}
                    onSubmitLogin={this.onSubmitLogin}
                    onChangeName={this.onChangeName}
                    onChangePhone={this.onChangePhone}
                    onChangeDob={this.onChangeDob}
                    birthdateCheck={this.birthdateCheck}
                  />
                </div>
              ) : (
                <LoginViaOtp
                  onChangeMobile={this.onChangeMobile}
                  onChangeOtp={this.onChangeOtp}
                  onChangeDob={this.onChangeDob}
                  onSubmitMobileNumber={this.onSubmitMobileNumber}
                  onSubmitNameAndEmail={this.onSubmitNameAndEmail}
                  onSubmitEmail={this.onSubmitEmail}
                  onSubmitOtp={this.onSubmitOtp}
                  onSubmitDob={this.onSubmitDob}
                  onSkipDob={this.onSkipDob}
                  otp={otp}
                  otpError={otpError}
                  otpErrorMessage={otpErrorMessage}
                  onChangeName={this.onChangeName}
                  onChangeEmail={this.onChangeEmail}
                  onSubmitName={this.onSubmitName}
                  name={name}
                  nameError={nameError}
                  nameErrorMessage={nameErrorMessage}
                  mobile={mobile}
                  mobileError={mobileError}
                  mobileErrorMessage={mobileErrorMessage}
                  mobilesubmitted={mobilesubmitted}
                  email={email}
                  emailError={emailError}
                  emailErrorMessage={emailErrorMessage}
                  dob={dob}
                  dobError={dobError}
                  dobErrorMessage={dobErrorMessage}
                  loaded={loaded}
                  loading={loading}
                  loggingIn={loggingIn}
                  handleResend={this.handleResend}
                  resend={resend}
                  askName={askName}
                  askEmail={askEmail}
                  askBirthDate={askBirthDate}
                  skipBirthdateCheck={skipBirthdateCheck}
                />
              )}
            </Div>
          </Row>
          <Row className={styles.socialLogin} display="block" mr="0" ml="0" pt="1rem" pb="1rem">
            <Div col="12" ta="center" mb="1rem">
              <Label fontFamily="regular" ta="center" color="color79716c" fontSize="1rem" va="middle">
                Or continue with
              </Label>
            </Div>
            <Div col="6" ta="center" mb="0" pr="0.625rem">
              <Button
                btnType="custom"
                fontFamily="regular"
                ta="center"
                color="black"
                mr="0.3125rem"
                fontSize="0.825rem"
                va="middle"
                border="1px solid #e6e6e6"
                size="block"
                height="42px"
                bg="#FFF"
                onClick={this.toggleLoginForm}
              >
                {!this.state.loginviaotp ? (
                  <Img display="inline-block" src={OTPIcon} alt="OTP" va="sub" width="18px" mr="10px" />
                ) : (
                  <Img display="inline-block" src={EmailIcon} alt="OTP" va="sub" width="18px" mr="10px" />
                )}
                {!this.state.loginviaotp ? 'OTP' : 'Login Via Email Id'}
              </Button>
            </Div>
            <Div col="6" ta="center" mb="0" pl="0.625rem">
              <GoogleLoginBtn
                askContact={askContact}
                askName={askName}
                askBirthDate={askBirthDate}
                loginType={loginType}
                loading={loading}
              />
            </Div>
          </Row>
        </Section>
      </div>
    );
  }
}
