import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResetPasswordForm from 'hometown-components/lib/Forms/ResetPasswordForm';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import { isBlank } from 'js-utility-functions';
import { validatePassword } from 'utils/validation';
import { resetPassword } from 'redux/modules/forgotpassword';
import { allowNChar } from 'utils/helper';
import OtherMenuFooter from 'containers/OtherMenuFooter';
import { BASE_IMAGE_URL } from "helpers/Constants";

@connect(({ forgotpassword }) => ({
  response: forgotpassword
}))
export default class ResetPasswordFormContainer extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    params: PropTypes.object
  };
  state = {
    newPwd: '',
    newPwdError: false,
    newPwdErrorMessage: '',
    confirmPwd: '',
    confirmPwdError: false,
    confirmPwdErrorMessage: ''
  };
  componentWillReceiveProps(nextProps) {
    if (window && nextProps.response.passwordUpdated) {
      window.setTimeout(() => nextProps.history.push('/login'), 2000);
    }
  }
  onChangeNewPwd = e => {
    const {
      target: { value }
    } = e;
    const checkError = validatePassword(value, 'Password must be at least 6 character long');
    if (!allowNChar(value, 15)) {
      return;
    }
    this.setState({
      newPwd: value,
      newPwdError: checkError.error,
      newPwdErrorMessage: checkError ? checkError.errorMessage : ''
    });
  };
  onChangeConfirmPwd = e => {
    const {
      target: { value }
    } = e;
    if (!allowNChar(value, 15)) {
      return;
    }
    const checkError = this.matchConfirmPassword(value);
    this.setState({
      confirmPwd: value,
      confirmPwdError: checkError,
      confirmPwdErrorMessage: checkError ? "Confirm Password doesn't match" : ''
    });
  };
  onSubmitUpdatePassword = e => {
    e.preventDefault();
    const {
      confirmPwd, newPwd, newPwdError, confirmPwdError
    } = this.state;
    const checkNewPwd = isBlank(newPwd) || newPwdError;
    const checkConfirmPwd = isBlank(confirmPwd) || confirmPwdError;
    if (newPwd !== confirmPwd) {
      return this.setState({
        confirmPwdError: true,
        confirmPwdErrorMessage: "Confirm Password doesn't match"
      });
    }
    if (checkConfirmPwd || checkNewPwd) {
      return this.setState({
        newPwdError: checkNewPwd,
        newPwdErrorMessage: checkNewPwd ? 'Password must contain atleast 6 and max 15 characters' : '',
        confirmPwdError: checkConfirmPwd,
        confirmPwdErrorMessage: checkConfirmPwd ? "Confirm Password doesn't match" : ''
      });
    }

    const { dispatch } = this.context.store;
    const { response } = this.props;
    const { hash } = response.checkHash;

    dispatch(resetPassword(this.state, hash));
  };

  matchConfirmPassword = value => {
    if (value === this.state.newPwd) {
      return false;
    }
    return true;
  };
  render() {
    const styles = require('./index.scss');

    const {
      newPwd, confirmPwd, newPwdError, newPwdErrorMessage, confirmPwdError, confirmPwdErrorMessage
    } = this.state;
    const { response } = this.props;
    const {
      checkHash: { is_valid: isValid }
    } = response;
    return (
      <OtherMenuFooter hideright>
        <div className={styles.formContainer}>
          {isValid ? (
            <div>
              <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
                <Container type="container" pr="1rem" pl="1rem">
                  <Row display="block" mr="0" ml="0">
                    <Heading fontFamily="light" fontSize="1.25rem" color="textDark" mb="0px" mt="0px">
                      Reset Password
                    </Heading>
                  </Row>
                </Container>
              </Section>
              <div className={styles.formWrapper}>
                <Section
                  p="1.25rem"
                  mb="0"
                  bg="sectionBgDark"
                  boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
                  height="calc(100vh - 104px)"
                >
                  <Row display="block" mr="0" ml="0">
                    <Div>
                      <ResetPasswordForm
                        newPwd={newPwd}
                        onChangeNewPwd={this.onChangeNewPwd}
                        newPwdFeedBackError={newPwdError}
                        newPwdFeedBackMessage={newPwdErrorMessage}
                        confirmPwd={confirmPwd}
                        onChangeConfirmPwd={this.onChangeConfirmPwd}
                        confirmPwdFeedBackError={confirmPwdError}
                        confirmPwdFeedBackMessage={confirmPwdErrorMessage}
                        onSubmitUpdatePassword={this.onSubmitUpdatePassword}
                        resetResponse={response}
                      />
                    </Div>
                  </Row>
                </Section>
              </div>
            </div>
          ) : (
            <Section display="flex" p="0" pt="0.5rem" mb="0">
              <Empty
                title="Password link is expired !!"
                subTitle=""
                btnName="Resend Link"
                url="/forgot-password"
                bg="#fafafa"
              >
                <Img src={`${BASE_IMAGE_URL}/media/cms/extras/password-expired-icon.png`} width="initial" m="auto" alt="Password link is expired !!" />
              </Empty>
            </Section>
          )}
        </div>
      </OtherMenuFooter>
    );
  }
}
