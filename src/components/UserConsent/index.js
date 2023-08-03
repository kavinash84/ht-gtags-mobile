import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import { Label } from 'hometown-components/lib/Label';
import Input from 'hometown-components/lib/Input';
import Text from 'hometown-components/lib/Text';
import Button from 'hometown-components/lib/Buttons';
import Row from 'hometown-components/lib/Row';
import { validateMobile } from '../../utils/validation';

import { postConsent } from 'redux/modules/userconsent';

const logo = require('../../../static/logo.png');
const style = require('./style.scss');

@connect(({ userconsent }) => ({ userconsent }), { postConsent })
export class UserConsent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      phoneError: false,
      phoneErrorMessage: 'Enter numbers only',
      disable: true,
      accepted: false,
      checkboxError: false,
      checkboxErrorMessage: '',
      successMessage: ''
    };
  }

  componentDidUpdate(previousProps) {
    const { userconsent } = this.props;
    if (previousProps.userconsent.successMessage !== userconsent.successMessage) {
      this.setSuccessMessage(userconsent.successMessage);
    }
  }

  setSuccessMessage = msg => {
    this.setState({
      successMessage: msg
    });
  };

  onChangePhone = e => {
    e.preventDefault();
    const validNum = !isNaN(e.target.value);
    if (validNum) {
      this.setState({
        phone: e.target.value,
        phoneError: false,
        successMessage: ''
      });
    } else {
      this.setState({
        phoneError: true,
        successMessage: ''
      });
    }
  };

  onChangeCheckbox = () => {
    this.setState(
      {
        accepted: !this.state.accepted,
        disable: !this.state.disable
      },
      () =>
        this.setState({
          checkboxError: !this.state.accepted,
          successMessage: ''
        })
    );
  };

  onSubmit = e => {
    e.preventDefault();
    const { phone, accepted } = this.state;
    const { postConsent, userconsent } = this.props;
    const validatePhone = validateMobile(phone);
    if (validatePhone && accepted) {
      postConsent(phone, 1);
      this.setState({
        phone: '',
        accepted: false,
        successMessage: userconsent.successMessage
      });
    } else if (!validatePhone) {
      this.setState({
        phoneError: true,
        phoneErrorMessage: 'Enter a valid mobile number',
        successMessage: ''
      });
    } else {
      this.setState({
        checkboxError: true,
        checkboxErrorMessage: '*check the checkbox before submiting',
        successMessage: ''
      });
    }
  };

  render() {
    const { userconsent } = this.props;
    const {
      phone,
      phoneError,
      phoneErrorMessage,
      accepted,
      checkboxError,
      checkboxErrorMessage,
      successMessage
    } = this.state;
    return (
      <Section>
        <Div mt="50px">
          <Link to="/">
            <Img src={logo} alt="logo" width="13rem" m="auto" />
          </Link>
          <Div mt="40px" mb="50px">
            <Heading
              style={{
                whiteSpace: 'normal',
                color: 'black',
                fontSize: '1rem',
                textAlign: 'center',
                lineHeight: '2rem'
              }}
            >
              We don’t want you to miss out on special offers, exclusive coupons, vouchers or any other promotions that
              we think would interest you.
            </Heading>
            <Div mt="30px" mb="40px">
              <Div style={{ display: 'flex', justifyContent: 'center' }}>
                <Label mr="1rem" fontSize="1rem">
                  Mobile No. :
                </Label>
                <Input
                  type="text"
                  value={phone}
                  onChange={this.onChangePhone}
                  style={{
                    width: '50%',
                    height: '1.5rem',
                    borderColor: 'green'
                  }}
                />
              </Div>
              {phoneError ? (
                <Text color="red" fontSize="10px" pl="40%">
                  {phoneErrorMessage}
                </Text>
              ) : null}
              <Div mt="20px" p="0px 1rem">
                <Input
                  type="checkbox"
                  checked={accepted}
                  onChange={this.onChangeCheckbox}
                  style={{
                    float: 'left',
                    width: '1.1rem',
                    marginRight: '10px',
                    marginLeft: '2rem',
                    marginTop: '1.1rem',
                    height: '1rem',
                    borderColor: 'green'
                  }}
                />
                <Text fontSize="1rem" style={{ lineHeight: '2rem' }}>
                  Yes Please – I want to receive offers or promotions from Praxis Home Retail Ltd. by sms and emails in
                  accordance to the{' '}
                  <a href="/privacy-policy">
                    <span style={{ color: 'blue' }}>privacy policy</span>
                  </a>
                </Text>
              </Div>
            </Div>
            <Div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Button
                type="submit"
                onClick={this.onSubmit}
                style={{
                  padding: '0.5rem 2.5rem',
                  borderColor: 'orangered',
                  color: 'orangered'
                }}
              >
                Submit
              </Button>
              {checkboxError ? (
                <Text color="red" fontSize="10px">
                  {checkboxErrorMessage}
                </Text>
              ) : null}
            </Div>
          </Div>
          {successMessage ? (
            <Heading color="green" ta="center" style={{ whiteSpace: 'normal', overflow: 'unset', color: 'green' }}>
              {userconsent.successMessage}
            </Heading>
          ) : null}
        </Div>
      </Section>
    );
  }
}

export default UserConsent;
