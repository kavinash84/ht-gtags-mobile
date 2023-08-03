import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SignupForm from 'hometown-components/lib/Forms/SignupForm';
import Text from 'hometown-components/lib/Text';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Theme from 'hometown-components/lib/Theme';
import Img from 'hometown-components/lib/Img';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import Section from 'hometown-components/lib/Section';
import DatePicker from 'components/Form/DatePicker';
import moment from 'moment';


import { validateMobile, validatePassword, validateEmail, validateName, validateDob, checkSpecialChar  } from 'utils/validation';
import { LOGIN_URL } from 'helpers/Constants';
import { signUp } from 'redux/modules/signup';
import { allowNChar, allowTypeOf } from 'utils/helper';

import "./Signdatepicker.css";

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
@connect(({ userSignUp, app }) => ({
  loading: userSignUp.loading,
  session: app.sessionId
}))
@withRouter
export default class SignupFormContainer extends Component {
  static propTypes = {
    session: PropTypes.string.isRequired,
    loading: PropTypes.bool
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    loading: false
  };
  constructor() {
    super();
    this.state = {
      name: '',
      nameError: false,
      nameErrorMessage: 'Numbers and special characters are not allowed !',
      email: '',
      emailError: false,
      emailErrorMessage: 'Enter Valid Email Id',
      phone: '',
      phoneError: false,
      phoneErrorMessage: 'Enter 10 Digits Valid Mobile Number',
      password: '',
      passwordError: false,
      passwordErrorMessage: 'Password must contain atleast 6 and max 15 characters',
      gender: '',
      genderError: false,
      genderErrorMessage: 'Select Gender',
      dob: '',
      dobError: false,
      dobErrorMessage: 'Enter Valid Date of Birth',
      city: '',
      cityError: false,
      cityErrorMessage: 'Enter Valid City',
      policyAccepted: false,
    };
  }
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
  onChangeDob = value => {
    console.log(value, 'value')
    const checkError = validateDob(value).error;
    this.setState({
      dob: value,
      dobError: checkError,
      dobErrorMessage: validateDob(value).msg
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
  onSubmitSignup = e => {
    e.preventDefault();
    const {
      target: { action }
    } = e;
    const isRedirect = action ? action.indexOf('redirect') !== -1 : false;
    const signupOrigin = isRedirect ? 'Top Nav' : 'Pop-up';
    const {
      name, email, password, phone, dob
    } = this.state;
    const checkName = validateName(name).error;
    const checkEmail = !validateEmail(email);
    const checkPhone = phone ? !validateMobile(phone) : false;
    const checkPassword = validatePassword(password);
    const checkDob = validateDob(dob).error;
    if (checkName || checkEmail || checkPassword.error || checkPhone|| checkDob) {
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
    
    const { dispatch } = this.context.store;
    const { session } = this.props;
    dispatch(signUp(this.state, session, signupOrigin));
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
      gender,
      genderError,
      genderErrorMessage,
      city,
      cityError,
      cityErrorMessage,
      policyAccepted,
      dob,
      dobError,
      dobErrorMessage,

    } = this.state;
    const { loading } = this.props;
    return (
      // <div className={styles.signupWrapper}>
      //   <Row display="block" mr="0" ml="0">
      //     <Div p="1.25rem 3.5rem">
      //       <div className={styles.formBlock}>
      //         <Row display="block" mt="0" mr="0" ml="0">
      //           <Div col="12" ta="center">
      //             <Heading color="#000" mt="0" mb="0" fontWeight="400" fontSize="2rem" ta="center" fontFamily="light">
      //               Sign up now
      //               <br />
      //               and get Rs. 500 off*
      //             </Heading>
      //             <Text color="#676767" ta="center" fontSize="1rem" mt="0">
      //               on your first purchase
      //             </Text>
      //           </Div>
      //         </Row>
      //         <Row display="block" mr="0" ml="0">
      //           <Div mt="0">
      //             <SignupForm
      //               email={email}
      //               onChangeEmail={this.onChangeEmail}
      //               emailFeedBackError={emailError}
      //               emailFeedBackMessage={emailErrorMessage}
      //               name={name}
      //               onChangeName={this.onChangeName}
      //               nameFeedBackError={nameError}
      //               nameFeedBackMessage={nameErrorMessage}
      //               phone={phone}
      //               onChangePhone={this.onChangePhone}
      //               phoneFeedBackError={phoneError}
      //               phoneFeedBackMessage={phoneErrorMessage}
      //               password={password}
      //               onChangePassword={this.onChangePassword}
      //               passwordFeedBackError={passwordError}
      //               passwordFeedBackMessage={passwordErrorMessage}
      //               onSubmitSignup={this.onSubmitSignup}
      //               loading={loading}
      //               loginUrl={LOGIN_URL}
      //             />
      //           </Div>
      //         </Row>
      //       </div>
      //     </Div>
      //   </Row>
      // </div>
      <Section width="100%" mb="0" p="0rem" mt="5px" pt="1.5rem" height="auto">
          <Row display="block" mr="0" ml="0">
            <Div col="12" ta="center">
              <Heading color="#000" mt="0" mb="0" fontWeight="400" fontSize="1.5rem" fontFamily="light">
                Sign Up Now 
                <br/>
                and get Rs. 500 off*
              </Heading>
              <Text color="#676767" ta="center" fontSize="1rem" mt="0">
                on your first purchase
              </Text>
              <Heading color="#000" mt="0px" mb="0px" fontWeight="400" fontSize="1rem">
                Do create your Hometown Wallet
                <br/>
                on registration
                <br/>
                for cashbacks in future.
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
                     onSubmitSignup={this.onSubmitSignup}
                     loading={loading}
                     loginUrl={LOGIN_URL}
                     noDate={dob}
                     date={showDateField(dob, this.onChangeDob)}
                     dobFeedBackMessage={dobErrorMessage}
                     dobFeedBackError={dobError}
              />
            </Div>
          </Row>
        </Section>
    );
  }
}
