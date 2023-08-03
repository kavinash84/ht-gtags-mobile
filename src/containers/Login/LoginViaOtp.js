/* eslint-disable no-nested-ternary */
import React from 'react';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Button from 'hometown-components/lib/Buttons';
import PropTypes from 'prop-types';
import UpdateDobviaOtp from './updateDob';

const LoaderIcon = require('../../../static/refresh.svg');

export default class LoginViaOtp extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    resendtimer: 30,
    timerref: ''
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.mobilesubmitted && nextProps.mobilesubmitted !== this.props.mobilesubmitted) {
      const timerref = setInterval(() => {
        if (this.state.resendtimer <= 1) {
          clearInterval(this.state.timerref);
        }
        this.setState(prevstate => ({
          resendtimer: prevstate.resendtimer - 1
        }));
      }, 1000);
      this.setState({ timerref });
    }
  }

  handleNo = () => {};

  render() {
    const {
      mobile,
      mobileError,
      mobileErrorMessage,
      otp,
      otpError,
      otpErrorMessage,
      mobilesubmitted,
      loading,
      loggingIn,
      resend,
      askName,
      askEmail,
      askBirthDate,
      email,
      emailError,
      emailErrorMessage,
      dob,
      dobError,
      dobErrorMessage,
      name,
      nameError,
      nameErrorMessage
    } = this.props;
    const {
      onSubmitMobileNumber,
      onSubmitOtp,
      onChangeMobile,
      onChangeOtp,
      onChangeDob,
      handleResend,
      onChangeName,
      onSubmitName,
      onChangeEmail,
      onSubmitEmail,
      onSubmitNameAndEmail,
      skipBirthdateCheck,
      onSkipDob,
      onSubmitDob
    } = this.props;
    const { resendtimer } = this.state;
    return (
      <div>
        {!mobilesubmitted ? (
          <form onSubmit={onSubmitMobileNumber}>
            <FormInput
              label="Mobile Number"
              onChange={onChangeMobile}
              value={mobile}
              type="text"
              placeholder="Enter your 10 digits number"
              feedBackError={mobileError}
              feedBackMessage={mobileErrorMessage}
            />
            <Button
              btnType="primary"
              size="block"
              boder="solid 1px rgba(151,151,151,0.47)"
              fontFamily="regular"
              height="38px"
              mt="0"
              ml="-1px"
              onClick={this.onSubmitMobileNumber}
              disabled={loading}
            >
              GET OTP
            </Button>
          </form>
        ) : askName && askEmail ? (
          <form onSubmit={onSubmitNameAndEmail}>
            <FormInput
              label="Name"
              onChange={onChangeName}
              value={name}
              type="text"
              placeholder="Please enter your name"
              feedBackError={nameError}
              feedBackMessage={nameErrorMessage}
            />
            <FormInput
              label="Email"
              onChange={onChangeEmail}
              value={email}
              type="text"
              placeholder="Please enter your email"
              feedBackError={emailError}
              feedBackMessage={emailErrorMessage}
            />
            <Button
              btnType="primary"
              size="block"
              boder="solid 1px rgba(151,151,151,0.47)"
              fontFamily="regular"
              height="38px"
              mt="0"
              ml="-1px"
              onClick={this.onSubmitNameAndEmail}
              disabled={loggingIn}
            >
              {loggingIn ? 'Please Wait..' : 'Update & Login'}
            </Button>
          </form>
        ) : askName ? (
          <form onSubmit={onSubmitName}>
            <FormInput
              label="Name"
              onChange={onChangeName}
              value={name}
              type="text"
              placeholder="Please enter your name!"
              feedBackError={nameError}
              feedBackMessage={nameErrorMessage}
            />
            <Button
              btnType="primary"
              size="block"
              boder="solid 1px rgba(151,151,151,0.47)"
              fontFamily="regular"
              height="38px"
              mt="0"
              ml="-1px"
              onClick={this.onSubmitName}
              disabled={loading}
            >
              {loggingIn ? 'Please Wait..' : 'Update & Login'}
            </Button>
          </form>
        ) : askEmail ? (
          <form onSubmit={onSubmitEmail}>
            <FormInput
              label="Email"
              onChange={onChangeEmail}
              value={email}
              type="text"
              placeholder="Please enter your email"
              feedBackError={emailError}
              feedBackMessage={emailErrorMessage}
            />
            <Button
              btnType="primary"
              size="block"
              boder="solid 1px rgba(151,151,151,0.47)"
              fontFamily="regular"
              height="38px"
              mt="0"
              ml="-1px"
              onClick={this.onSubmitEmail}
              disabled={loggingIn}
            >
              {loggingIn ? 'Please Wait..' : 'Update & Login'}
            </Button>
          </form>
        ) : askBirthDate ? (
          // <form onSubmit={onSubmitDob}>
          //   <FormInput
          //     label=""
          //     type="text"
          //     placeholder="Enter your date of birth!"
          //     onChange={onChangeDob}
          //     value={dob}
          //     feedBackError={dobError}
          //     feedBackMessage={dobErrorMessage}
          //   />
          //   <Button
          //     btnType="primary"
          //     size="block"
          //     boder="solid 1px rgba(151,151,151,0.47)"
          //     fontFamily="regular"
          //     height="38px"
          //     mt="0"
          //     ml="-1px"
          //     disabled={loggingIn}
          //   >
          //     {loggingIn ? "Please Wait.." : "Update & Login"}
          //   </Button>
          // </form>
          <UpdateDobviaOtp
            loggingIn={loggingIn}
            dob={dob}
            dobError={dobError}
            dobErrorMessage={dobErrorMessage}
            onChangeDob={onChangeDob}
            LoaderIcon={LoaderIcon}
            skipBirthdateCheck={skipBirthdateCheck}
            onSkipDob={onSkipDob}
            onSubmitDob={onSubmitDob}
          />
        ) : (
          <div>
            <form onSubmit={onSubmitOtp}>
              <FormInput
                label="OTP"
                onChange={onChangeOtp}
                value={otp}
                type="text"
                placeholder="******"
                feedBackError={otpError}
                feedBackMessage={otpErrorMessage}
              />
              <Button
                btnType="primary"
                size="block"
                boder="solid 1px rgba(151,151,151,0.47)"
                fontFamily="regular"
                height="38px"
                mt="0"
                ml="-1px"
                onClick={this.onSubmitOtp}
                disabled={loggingIn}
              >
                SUBMIT
              </Button>
            </form>
            {!resend && (
              <Button
                boder="solid 1px rgba(151,151,151,0.47)"
                fontFamily="regular"
                height="30px"
                mt="5px"
                ml="-1px"
                onClick={handleResend}
                disabled={resendtimer > 0}
              >
                RESEND OTP {resendtimer > 0 ? resendtimer : ''}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
}

LoginViaOtp.defaultProps = {
  mobilesubmitted: false,
  mobile: '',
  mobileError: false,
  mobileErrorMessage: '',
  otp: '',
  otpError: false,
  otpErrorMessage: '',
  dob: '',
  dobError: false,
  dobErrorMessage: '',
  name: '',
  nameError: false,
  nameErrorMessage: '',
  email: '',
  emailError: false,
  emailErrorMessage: '',
  askName: false,
  askEmail: false,
  askBirthDate: false
};
LoginViaOtp.propTypes = {
  mobilesubmitted: PropTypes.bool,
  mobile: PropTypes.string,
  mobileError: PropTypes.bool,
  mobileErrorMessage: PropTypes.string,
  otp: PropTypes.string,
  otpError: PropTypes.bool,
  otpErrorMessage: PropTypes.string,
  dob: PropTypes.instanceOf(Date),
  dobError: PropTypes.bool,
  dobErrorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  resend: PropTypes.bool.isRequired,
  onSubmitMobileNumber: PropTypes.func.isRequired,
  onSubmitOtp: PropTypes.func.isRequired,
  onChangeMobile: PropTypes.func.isRequired,
  onChangeOtp: PropTypes.func.isRequired,
  handleResend: PropTypes.func.isRequired,
  onChangeDob: PropTypes.func.isRequired,
  onSubmitDob: PropTypes.func.isRequired,
  askName: PropTypes.bool,
  askEmail: PropTypes.bool,
  askBirthDate: PropTypes.bool,
  name: PropTypes.string,
  nameError: PropTypes.bool,
  nameErrorMessage: PropTypes.string,
  email: PropTypes.string,
  emailError: PropTypes.bool,
  emailErrorMessage: PropTypes.string,
  onSubmitName: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onSubmitEmail: PropTypes.func.isRequired,
  onSubmitNameAndEmail: PropTypes.func.isRequired,
  skipBirthdateCheck: PropTypes.bool.isRequired,
  onSkipDob: PropTypes.func.isRequired
};
