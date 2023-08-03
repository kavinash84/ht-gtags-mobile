/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import moment from 'moment';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import PropTypes from 'prop-types';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import { FeedBackMessage } from 'hometown-components/lib/Label';
import DatePicker from 'components/Form/DatePicker';

import { getOtpfromSignUp, resendOtpfromSignUp } from 'redux/modules/login';
// import { allowNChar, allowTypeOf } from 'utils/helper';

const formatDate = date => {
  if (date) {
    return moment(date, 'YYYY-MM-DD').toDate();
  }
};

const tenYearsAgo = moment()
  .subtract(10, 'years')
  .toDate();
class UpdateContactAndDob extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      view: 'createWallet',
      mobilesubmitted: false,
      resend: false,
      resendtimer: 30,
      timerref: ''
    };
  }

  isValid = () => {
    const { phoneError, dobError, phone } = this.props;
    // if (firstNameError) return false;
    // if (lastNameError) return false;
    if (phoneError) return false;
    if (dobError) return false;
    // if (!firstName) return false;
    // if (!lastName) return false;
    if (!phone) return false;
    return true;
  };

  handleResend = phone => {
    this.setState({
      mobilesubmitted: false,
      resend: true
    });
    const { dispatch } = this.context.store;
    dispatch(resendOtpfromSignUp(phone));
  };

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

  render() {
    const {
      phone,
      phoneError,
      phoneErrorMessage,
      onChangeDob,
      dob,
      dobError,
      dobErrorMessage,
      loggingIn,
      onChangePhone,
      onSubmitMobileNumber,
      onSubmitMobileAndDob,
      onChangeOtp,
      otp,
      otpError,
      otpErrorMessage,
      // mobilesubmitted,
      birthdateCheck
      // session,
      // loginViaLogin,
      // onSubmitOtp,
      // handleResend,
    } = this.props;
    const { view, resendtimer, resend } = this.state;

    return (
      <div>
        <Row display="block" mr="0" ml="0" mb="10px">
          <Div col="12" ta="center">
            <Heading color="color676767" mt="0" mb="0" fontWeight="400" fontSize="26px" ta="center" fontFamily="light">
              Update Profile
            </Heading>
            {view === 'createWallet' ? (
              <Div>
                <Div>
                  <Text color="color676767" ta="center">
                    Your wallet is not created. Would you like to create a wallet?
                  </Text>
                </Div>
                <Div style={{ display: 'flex' }}>
                  <button
                    style={{ margin: '0 10px' }}
                    className="google-login-btn"
                    onClick={() => this.setState({ view: 'dobAndMobile' })}
                  >
                    Yes
                  </button>
                  <button
                    style={{ margin: '0 10px' }}
                    className="google-login-btn"
                    onClick={() => {
                      birthdateCheck(true);
                      this.setState({ view: 'mobile' });
                    }}
                  >
                    No
                  </button>
                </Div>
              </Div>
            ) : view === 'dobAndMobile' ? (
              <Div>
                <Div>
                  <Text color="color676767" ta="center">
                    Your wallet is not created. Would you like to create a wallet?
                  </Text>
                </Div>
                <Div ta="left">
                  <form className="bulk-order-form">
                    <Div mb="0.625rem">
                      <DatePicker
                        onChange={onChangeDob}
                        selectedDay={formatDate(dob)}
                        dayPickerProps={{
                          initialMonth: tenYearsAgo,
                          disabledDays: { after: tenYearsAgo }
                        }}
                      />
                      {dobError && <FeedBackMessage type="error">{dobErrorMessage}</FeedBackMessage>}
                    </Div>
                    <FormInput
                      label="Phone"
                      type="text"
                      placeholder=""
                      onChange={onChangePhone}
                      value={phone}
                      feedBackError={phoneError}
                      feedBackMessage={phoneErrorMessage}
                    />
                  </form>
                  <button
                    disabled={!this.isValid()}
                    className="google-login-btn"
                    onClick={() => {
                      const { dispatch } = this.context.store;
                      this.setState({
                        view: 'otp',
                        mobilesubmitted: true
                      });
                      dispatch(getOtpfromSignUp(phone));
                    }}
                  >
                    {loggingIn ? 'Please Wait' : 'Update'}
                  </button>
                </Div>
              </Div>
            ) : view === 'mobile' ? (
              <Div>
                <Div>
                  <Text color="color676767" ta="center">
                    Contact information is required to login
                  </Text>
                </Div>
                <Div ta="left">
                  <form
                    onSubmit={this.onSubmitForm}
                    id="custom_form"
                    name="custom_form"
                    encType="multipart/form-data"
                    className="bulk-order-form"
                  >
                    <FormInput
                      label="Phone"
                      type="text"
                      placeholder=""
                      onChange={onChangePhone}
                      value={phone}
                      feedBackError={phoneError}
                      feedBackMessage={phoneErrorMessage}
                    />
                  </form>
                  <button
                    disabled={!this.isValid()}
                    className="google-login-btn"
                    onClick={e => onSubmitMobileNumber(e)}
                  >
                    {loggingIn ? 'Please Wait' : 'Update'}
                  </button>
                </Div>
              </Div>
            ) : view === 'otp' ? (
              <Div>
                <Text color="color676767" ta="center">
                  We've sent an otp to your registered mobile
                </Text>
                <Div ta="center">
                  <form>
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
                      onClick={onSubmitMobileAndDob}
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
                      pt="0"
                      pb="0"
                      onClick={() => this.handleResend(phone)}
                      disabled={resendtimer > 0}
                    >
                      RESEND OTP {resendtimer > 0 ? resendtimer : ''}
                    </Button>
                  )}
                </Div>
              </Div>
            ) : null
            // (showDobInput ? (
            //   <Div style={{ display: hideDobInput ? 'none' : 'block' }}>
            //     <Div mb="0.625rem">
            //       <DatePicker
            //         dateFormat="dd/MM/yyyy"
            //         selected={formatDate(dob)}
            //         maxDate={moment()
            //           .subtract(10, 'years')
            //           .toDate()}
            //         onSelect={onChangeDob}
            //         showMonthDropdown
            //         showYearDropdown
            //         dropdownMode="select"
            //       />

            //       {dobError && <FeedBackMessage type="error">{dobErrorMessage}</FeedBackMessage>}
            //     </Div>
            //     <form
            //       onSubmit={this.onSubmitForm}
            //       id="custom_form"
            //       name="custom_form"
            //       encType="multipart/form-data"
            //       className="bulk-order-form"
            //     >
            //       <FormInput
            //         label="Phone"
            //         type="text"
            //         placeholder=""
            //         onChange={onChangePhone}
            //         value={phone}
            //         feedBackError={phoneError}
            //         feedBackMessage={phoneErrorMessage}
            //       />
            //     </form>
            //     <button
            //       disabled={!this.isValid()}
            //       className="google-login-btn"
            //       onClick={e => {
            //         e.preventDefault();
            //         if (hideDobInput) {
            //           loginViaLogin({}, session, phone);
            //         } else {
            //           onSubmitMobileNumber(e);
            //         }
            //       }}
            //     >
            //       {loggingIn ? 'Please Wait' : 'Update'}
            //     </button>
            //   </Div>
            // ) : (
            //   <Div style={{ display: 'flex' }}>
            //     <button
            //       style={{ margin: '0 10px' }}
            //       className="google-login-btn"
            //       onClick={() => this.setState({ showDobInput: true })}
            //     >
            //       Yes
            //     </button>
            //     <button
            //       style={{ margin: '0 10px' }}
            //       className="google-login-btn"
            //       onClick={() => this.setState({ hideDobInput: true, showDobInput: true })}
            //     >
            //       No
            //     </button>
            //   </Div>
            // )) : null
            }
          </Div>
        </Row>
      </div>
    );
  }
}

UpdateContactAndDob.defaultProps = {
  // firstName: '',
  // firstNameErrorMessage: '',
  // lastName: '',
  // lastNameErrorMessage: '',
  phone: '',
  dob: '',
  otp: '',
  phoneErrorMessage: '',
  birthdateCheck: () => {}
  // session: ''
};

UpdateContactAndDob.propTypes = {
  // loginViaLogin: PropTypes.func.isRequired,
  // onChangeLastName: PropTypes.func.isRequired,
  // onChangeFirstName: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  onChangeDob: PropTypes.func.isRequired,
  onSubmitMobileNumber: PropTypes.func.isRequired,
  onSubmitMobileAndDob: PropTypes.func.isRequired,
  onChangeOtp: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  // firstName: PropTypes.string,
  // firstNameError: PropTypes.bool.isRequired,
  // firstNameErrorMessage: PropTypes.string,
  phone: PropTypes.string,
  phoneError: PropTypes.bool.isRequired,
  phoneErrorMessage: PropTypes.string,
  dob: PropTypes.instanceOf(Date),
  dobError: PropTypes.bool.isRequired,
  dobErrorMessage: PropTypes.string.isRequired,
  otp: PropTypes.number,
  otpError: PropTypes.bool.isRequired,
  otpErrorMessage: PropTypes.string.isRequired,
  birthdateCheck: PropTypes.func
  // lastName: PropTypes.string,
  // lastNameError: PropTypes.bool.isRequired,
  // lastNameErrorMessage: PropTypes.string,
  // session: PropTypes.string
};

export default UpdateContactAndDob;
