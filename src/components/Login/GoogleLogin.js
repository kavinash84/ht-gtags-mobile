/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import ResponsiveModal from 'components/Modal';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import { validateMobile, validateName, validateDob } from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';
import GoogleLoginBtn from 'react-google-login';
import { googleLogin, resendOtp, clearLoginState, birthdateCheck } from 'redux/modules/login';
import UpdateName from './UpdateName';
import UpdateContacts from './UpdateContacts';
import UpdateDob from './UpdateDob';
import UpdateContactAndDob from './UpdateContactAndDob';

const LoaderIcon = require('../../../static/refresh.svg');

const mapStateToProps = ({ app, userLogin }) => ({
  session: app.sessionId,
  userLogin: app.userLogin,
  skipBirthdateCheck: userLogin.skipBirthdateCheck
});

const onSuccess = (dispatcher, session, phone) => result => {
  dispatcher(result, session, phone, null, null, false, null, true);
};

const onError = error => e => {
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginViaLogin: googleLogin,
      clearLogin: clearLoginState
    },
    dispatch
  );

const GoogleIcon = require('../../../static/google.svg');

class GoogleLogin extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      phoneError: false,
      phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
      mobilesubmitted: false,
      firstName: '',
      firstNameError: false,
      firstNameErrorMessage: 'Please enter a valid first name',
      lastName: '',
      lastNameError: false,
      lastNameErrorMessage: 'Please enter a valid last name',
      otp: '',
      otpErrorMessage: 'OTP Should be 6 Characters',
      resend: false,
      mobilesubmitted: false,
      open: false,
      resendtimer: 30
    };
  }

  componentDidUpdate(nextProps, prevState) {
    if (this.state.mobilesubmitted && this.state.mobilesubmitted !== prevState.mobilesubmitted) {
      const timerref = setInterval(() => {
        if (this.state.resendtimer <= 1) {
          clearInterval(this.state.timerref);
        }
        this.setState(prevstate => ({
          resendtimer: prevstate.resendtimer - 1
        }));
      }, 1000);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ timerref });
    }
  }

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

  onSubmitMobileNumber = e => {
    e.preventDefault();
    const { phone, resend, dob } = this.state;
    const checkmobile = !validateMobile(phone);
    const { session, skipBirthdateCheck, loginViaLogin } = this.props;

    if (checkmobile) {
      return this.setState({
        phoneError: true,
        phoneErrorMessage: 'Please Enter Valid Mobile Number'
      });
    }
    const { dispatch } = this.context.store;
    if (resend) {
      return dispatch(resendOtp(this.state.phone));
    }

    loginViaLogin({}, session, phone, null, moment(dob).format('YYYY-MM-DD'), true, null, false);
    this.setState({
      mobilesubmitted: true
    });
  };

  onSubmitMobileAndDob = e => {
    e.preventDefault();
    const { phone, resend, dob, otp } = this.state;
    const checkmobile = !validateMobile(phone);
    const { session, skipBirthdateCheck, loginViaLogin } = this.props;

    if (checkmobile) {
      return this.setState({
        phoneError: true,
        phoneErrorMessage: 'Please Enter Valid Mobile Number'
      });
    }
    const { dispatch } = this.context.store;
    if (resend) {
      return dispatch(resendOtp(this.state.phone));
    }

    loginViaLogin({}, session, phone, null, dob, false, otp, true);
    this.setState({
      mobilesubmitted: true
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
        value[0] === '0' ? 'Mobile Number Must Not Start With 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangeFirstName = e => {
    const {
      target: { value }
    } = e;

    let isInvalid = validateName(value).error;
    isInvalid = !isInvalid ? value.includes('customer') : true;

    // if (isInvalid) {
    return this.setState({
      firstName: value,
      firstNameError: isInvalid
    });
    // }
  };
  onChangeLastName = e => {
    const {
      target: { value }
    } = e;

    let isInvalid = validateName(value).error;
    isInvalid = !isInvalid ? value.includes('customer') : true;

    this.setState({
      lastName: value,
      lastNameError: isInvalid
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
        dobError: checkError,
        dobErrorMessage: validateDob(value).msg
      });
    } else {
      this.setState({ dobError: true, dobErrorMessage: 'Wallet user should be atleast 10 years old' });
    }
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
  onSubmitOtp = e => {
    e.preventDefault();
    const { otp, phone, dob } = this.state;
    const { session, skipBirthdateCheck } = this.props;
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
    // dispatch(linkFuturePay({ skipOtpValidation: true }));
    // dispatch(this.props.loginViaLogin({}, session, phone, null ,dob, skipBirthdateCheck, otp, true));
    // dispatch(loadUserProfile());
  };
  handleResend = () => {
    this.setState({
      // mobilesubmitted: false,
      resend: true
    });
    const { dispatch } = this.context.store;
    const { phone } = this.state;
    dispatch(resendOtp(phone));
  };
  birthdateCheck = status => {
    const { dispatch } = this.context.store;
    dispatch(birthdateCheck(status));
  };
  handleModal = () => {
    this.props.clearLogin();
  };
  isValid = () => {
    const value = this.state.phone;
    const valid = !validateMobile(value);
    return valid;
  };
  render() {
    const {
      loginViaLogin,
      session,
      askContact,
      askName,
      askBirthDate,
      loginType,
      loggingIn,
      skipBirthdateCheck
    } = this.props;
    const {
      // eslint-disable-next-line max-len
      phone,
      phoneError,
      phoneErrorMessage,
      dob,
      dobError,
      dobErrorMessage,
      firstName,
      firstNameError,
      firstNameErrorMessage,
      lastName,
      lastNameError,
      lastNameErrorMessage,
      mobilesubmitted,
      otp,
      otpError,
      otpErrorMessage,
      resend,
      resendtimer
    } = this.state;
    const open = (askContact || askName || askBirthDate) && loginType && loginType === 'google';
    return (
      <div>
        <GoogleLoginBtn
          className="socialBtn"
          clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
          onSuccess={onSuccess(loginViaLogin, session)}
          onFailure={onError}
        >
          <Img display="inline-block" src={GoogleIcon} alt="Google" va="sub" width="18px" mr="10px" /> GOOGLE
        </GoogleLoginBtn>
        <ResponsiveModal
          onCloseModal={this.handleModal}
          open={open}
          classNames={{
            overlay: 'bulkOrderOverlayModal',
            modal: 'updateProfileModal'
          }}
        >
          {askName && askContact ? (
            <UpdateContacts
              session={session}
              loggingIn={loggingIn}
              firstName={firstName}
              firstNameError={firstNameError}
              firstNameErrorMessage={firstNameErrorMessage}
              lastName={lastName}
              lastNameError={lastNameError}
              lastNameErrorMessage={lastNameErrorMessage}
              phone={phone}
              phoneError={phoneError}
              phoneErrorMessage={phoneErrorMessage}
              onChangeFirstName={this.onChangeFirstName}
              onChangeLastName={this.onChangeLastName}
              onChangePhone={this.onChangePhone}
              loginViaLogin={loginViaLogin}
            />
          ) : askContact && askBirthDate ? (
            <UpdateContactAndDob
              session={session}
              loggingIn={loggingIn}
              phone={phone}
              phoneError={phoneError}
              phoneErrorMessage={phoneErrorMessage}
              onChangePhone={this.onChangePhone}
              dob={dob}
              dobError={dobError}
              dobErrorMessage={dobErrorMessage}
              onChangeDob={this.onChangeDob}
              onSubmitMobileNumber={this.onSubmitMobileNumber}
              onSubmitMobileAndDob={this.onSubmitMobileAndDob}
              mobilesubmitted={mobilesubmitted}
              LoaderIcon={LoaderIcon}
              skipBirthdateCheck={skipBirthdateCheck}
              birthdateCheck={this.birthdateCheck}
              loginViaLogin={loginViaLogin}
              onSubmitOtp={this.onSubmitOtp}
              onChangeOtp={this.onChangeOtp}
              otp={otp}
              otpError={otpError}
              otpErrorMessage={otpErrorMessage}
              resend={resend}
              resendtimer={resendtimer}
              handleResend={this.handleModal}
            />
          ) : askName ? (
            <UpdateName
              session={session}
              loggingIn={loggingIn}
              firstName={firstName}
              firstNameError={firstNameError}
              firstNameErrorMessage={firstNameErrorMessage}
              lastName={lastName}
              lastNameError={lastNameError}
              lastNameErrorMessage={lastNameErrorMessage}
              onChangeFirstName={this.onChangeFirstName}
              onChangeLastName={this.onChangeLastName}
              loginViaLogin={loginViaLogin}
            />
          ) : askBirthDate ? (
            <UpdateDob
              session={session}
              loggingIn={loggingIn}
              dob={dob}
              dobError={dobError}
              dobErrorMessage={dobErrorMessage}
              onChangeDob={this.onChangeDob}
              LoaderIcon={LoaderIcon}
              skipBirthdateCheck={skipBirthdateCheck}
              birthdateCheck={this.birthdateCheck}
              loginViaLogin={loginViaLogin}
            />
          ) : askContact ? (
            <Div>
              <Row display="block" mr="0" ml="0" mb="10px">
                <Div col="12" ta="center">
                  <Heading
                    color="color676767"
                    mt="0"
                    mb="0"
                    fontWeight="400"
                    fontSize="26px"
                    ta="center"
                    fontFamily="light"
                  >
                    Update Profile
                  </Heading>
                  <Text color="color676767" ta="center">
                    Mobile number is required to login
                  </Text>
                </Div>
              </Row>
              <Div ta="center">
                <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
                  <form
                    onSubmit={this.onSubmitForm}
                    id="custom_form"
                    name="custom_form"
                    encType="multipart/form-data"
                    className="bulk-order-form"
                  >
                    <FormInput
                      label=""
                      type="text"
                      placeholder=""
                      onChange={this.onChangePhone}
                      value={phone}
                      feedBackError={phoneError}
                      feedBackMessage={phoneErrorMessage}
                    />
                  </form>
                  <button
                    disabled={this.isValid()}
                    className="google-login-btn"
                    onClick={e => {
                      e.preventDefault();
                      loginViaLogin({}, session, phone);
                    }}
                  >
                    {loggingIn ? 'Please Wait' : 'Update Contact'}
                  </button>
                </Text>
              </Div>
            </Div>
          ) : null}
        </ResponsiveModal>
      </div>
    );
  }
}

GoogleLogin.propTypes = {
  loginViaLogin: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
  clearLogin: PropTypes.func.isRequired,
  askContact: PropTypes.bool.isRequired,
  askName: PropTypes.bool.isRequired,
  askBirthDate: PropTypes.bool.isRequired,
  loginType: PropTypes.string.isRequired,
  loggingIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);
