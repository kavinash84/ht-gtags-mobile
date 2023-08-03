import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import Menu from 'components/OtherMenu';
import DatePicker from 'components/Form/DatePicker';
import SignupForm from 'hometown-components/lib/Forms/SignupForm';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import { validateMobile, validatePassword, validateEmail, validateDob, checkSpecialChar } from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { LOGIN_URL } from 'helpers/Constants';
import { signUp } from 'redux/modules/signup';
import { validateName } from '../../utils/validation';
// import CreateWalletModal from './createWalletModal';

const tenYearsAgo = moment()
  .subtract(10, 'years')
  .toDate();

const showDateField = (dob, onChange) => (
  <DatePicker
    onChange={onChange}
    selectedDay={dob}
    dayPickerProps={{
      initialMonth: tenYearsAgo,
      disabledDays: { after: tenYearsAgo }
    }}
  />
);
@connect(state => ({
  signUpResponse: state.userSignUp,
  session: state.app.sessionId
}))
@withRouter
export default class SignupFormContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static propTypes = {
    signUpResponse: PropTypes.object.isRequired,
    session: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
  };
  state = {
    name: '',
    nameError: false,
    nameErrorMessage: 'Numbers and special characters are not allowed !',
    email: '',
    emailError: false,
    emailErrorMessage: 'Enter Valid Email Address',
    phone: '',
    phoneError: false,
    phoneErrorMessage: 'Enter 10 Digits Valid Mobile Number',
    password: '',
    passwordError: false,
    passwordErrorMessage: 'Password must contain atleast 6 and max 15 characters',
    dob: '',
    dobError: false,
    dobErrorMessage: 'Enter Valid Date of Birth',
    gender: '',
    genderError: false,
    genderErrorMessage: 'Select Gender',
    city: '',
    cityError: false,
    cityErrorMessage: 'Enter Valid City',
    policyAccepted: false
    // showModal: false
  };
  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateEmail(value);
    this.setState({
      email: value,
      emailError: checkError
    });
  };
  onChangeName = e => {
    const {
      target: { value }
    } = e;
    const checkError = validateName(value).error;
    this.setState({
      name: value,
      nameError: checkError,
      nameErrorMessage: validateName(value).msg
    });
  };
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
        value[0] === '0' ? 'Mobile number must not start with 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangeGender = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      gender: value
    });
  };
  onChangeCity = e => {
    const {
      target: { value }
    } = e;
    const checkError = checkSpecialChar(value).error;
    this.setState({
      city: value,
      cityError: checkError,
      cityErrorMessage: checkSpecialChar(value).msg
    });
  };
  onChangePolicy = () => {
    this.setState({ policyAccepted: !this.state.policyAccepted });
  };
  onChangePassword = e => {
    const {
      target: { value }
    } = e;
    const checkError = validatePassword(value);
    if (!allowNChar(value, 15)) {
      return;
    }
    this.setState({
      password: value,
      passwordError: checkError.error
    });
  };
  onChangeDob = value => {
    const checkError = validateDob(value).error;
    this.setState({
      dob: value,
      dobError: checkError,
      dobErrorMessage: validateDob(value).msg
    });
  };

  onSubmitSignup = otp => {
    const { name, email, password, phone, dob } = this.state;
    const checkName = validateName(name).error;
    const checkEmail = !validateEmail(email);
    const checkPhone = !validateMobile(phone);
    const checkPassword = validatePassword(password);
    const checkDob = validateDob(dob).error;

    if (checkName || checkEmail || checkPassword.error || checkPhone || checkDob) {
      return this.setState({
        nameError: checkName,
        emailError: checkEmail,
        phoneError: checkPhone,
        passwordError: checkPassword.error,
        nameErrorMessage: validateName(name).msg,
        dobErrorMessage: validateDob(dob).msg,
        dobError: checkDob
      });
    }
    const dobValue = moment(dob).format('YYYY-MM-DD');
    let data = {};
    if (otp) {
      data = {
        ...this.state,
        dob: dobValue,
        otp
      };
    } else {
      data = {
        ...this.state,
        dob: dobValue
      };
    }
    const { dispatch } = this.context.store;
    const { session } = this.props;
    dispatch(signUp(data, session));
  };

  preOnsubmitSignup = e => {
    e.preventDefault();
    const { name, email, password, phone, dob } = this.state;
    const checkName = validateName(name).error;
    const checkEmail = !validateEmail(email);
    const checkPhone = !validateMobile(phone);
    const checkPassword = validatePassword(password);
    const checkDob = validateDob(dob);

    if (checkName || checkEmail || checkPassword.error || checkPhone || checkDob) {
      return this.setState({
        nameError: checkName,
        emailError: checkEmail,
        phoneError: checkPhone,
        passwordError: checkPassword.error,
        nameErrorMessage: validateName(name).msg,
        dobError: checkDob
      });
    }
    const myBirthday = moment(dob, 'DD-MM-YYYY').toDate();
    const currentDate = `${new Date().toJSON().slice(0, 10)} 01:00:00`;
    const myAge = Math.floor((Date.now(currentDate) - myBirthday) / 31557600000);
    // if (myAge > 10) {
    //   this.handleModal();
    // } else {
      this.onSubmitSignup();
    // }
    // this.handleModal();
  };

  // handleModal = () => {
  //   this.setState({ showModal: !this.state.showModal });
  // };

  // handleYes = otp => {
  //   this.onSubmitSignup(otp);
  // };

  handleClick = URL => e => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`${URL}/?redirect=/`);
  };

  render() {
    const styles = require('./index.scss');
    const {
      name,
      nameError,
      nameErrorMessage,
      email,
      phone,
      password,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      passwordError,
      passwordErrorMessage,
      dob,
      dobError,
      dobErrorMessage,
      gender,
      genderError,
      genderErrorMessage,
      city,
      cityError,
      cityErrorMessage,
      policyAccepted
    } = this.state;
    const { signUpResponse } = this.props;
    return (
      <div className={styles.signupWrapper}>
        <Menu />
        <Section bg="bg" mb="0" p="1.25rem" mt="5px" pt="1.5rem" height="auto">
          <Row display="block" mr="0" ml="0">
            <Div col="5">
              <Heading fontFamily="light" mt="0" mb="0" pb="2px" color="textDark" fontSize="1.25em">
                Sign Up
              </Heading>
            </Div>
          </Row>
          <Row display="block" mr="0" ml="0">
            <Div mt="1rem">
              <SignupForm
                email={email}
                onChangeEmail={this.onChangeEmail}
                emailFeedBackError={emailError}
                emailFeedBackMessage={emailErrorMessage}
                name={name}
                onChangeName={this.onChangeName}
                nameFeedBackError={nameError}
                nameFeedBackMessage={nameErrorMessage}
                phone={phone}
                onChangePhone={this.onChangePhone}
                phoneFeedBackError={phoneError}
                phoneFeedBackMessage={phoneErrorMessage}
                password={password}
                onChangePassword={this.onChangePassword}
                passwordFeedBackError={passwordError}
                passwordFeedBackMessage={passwordErrorMessage}
                onSubmitSignup={this.preOnsubmitSignup}
                signUpResponse={signUpResponse}
                loginUrl={LOGIN_URL}
                phonemandatory
                date={showDateField(dob, this.onChangeDob)}
                dobFeedBackMessage={dobErrorMessage}
                dobFeedBackError={dobError}
                gender={gender}
                genderFeedBackError={genderError}
                genderFeedBackMessage={genderErrorMessage}
                city={city}
                cityFeedBackError={cityError}
                cityFeedBackMessage={cityErrorMessage}
                onChangeGender={this.onChangeGender}
                onChangeCity={this.onChangeCity}
                onChangePolicy={this.onChangePolicy}
                policyAccepted={policyAccepted}
                noDate={dob}
              />
            </Div>
          </Row>
        </Section>
        {/* <CreateWalletModal
          showModal={this.state.showModal}
          handleModal={this.handleModal}
          handleNo={this.onSubmitSignup}
          handleYes={this.handleYes}
          mobile={phone}
        /> */}
      </div>
    );
  }
}
