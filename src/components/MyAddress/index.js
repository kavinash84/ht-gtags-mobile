/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Text from 'hometown-components/lib/Text';
import FormInput from 'hometown-components/lib/Forms/FormInput';

import { addAddress, updateAddress } from 'redux/modules/myaddress';
// Validators
import {
  isEmpty,
  pincode as validatePincode,
  validateEmail,
  validateMobile,
  validateAddress,
  validateName
} from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';

const addIcon = require('../../../static/round-add_circle_outline.svg');
const styles = require('./MyAddress.scss');

const initialState = {
  name: '',
  address1: '',
  address2: '',
  address3: '',
  pincode: '',
  phone: '',
  email: '',
  addressId: '',
  selectedAddress: '',
  editForm: false,
  addForm: false,
  emailError: false,
  emailErrorMessage: 'Email not Valid',
  phoneError: false,
  phoneErrorMessage: 'Phone number not Valid',
  pincodeError: false,
  pincodeErrorMessage: 'PinCode not Valid',
  address1Error: false,
  address1ErrorMessage: 'Address1 cannot be left Empty',
  address2Error: false,
  address2ErrorMessage: '',
  address3Error: false,
  address3ErrorMessage: '',
  nameError: false,
  nameErrorMessage: 'Name cannot be left Empty'
};
@connect(({ myaddress, profile }) => ({
  ...myaddress,
  useremail: profile.data.email,
  myaddress
}))
@withRouter
export default class DeliveryAddress extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    name: '',
    address1: '',
    address2: '',
    address3: '',
    pincode: '',
    phone: '',
    addressId: '',
    selectedAddress: '',
    editForm: false,
    addForm: false,
    emailError: false,
    emailErrorMessage: 'Email not Valid',
    phoneError: false,
    phoneErrorMessage: 'Enter 10 Digits Valid Mobile Number',
    pincodeError: false,
    pincodeErrorMessage: 'Pincode is not Valid',
    address1Error: false,
    address1ErrorMessage: 'Address1 cannot be left Empty',
    address2Error: false,
    address2ErrorMessage: '',
    address3Error: false,
    address3ErrorMessage: '',
    nameError: false,
    nameErrorMessage: 'Name cannot be left Empty'
  };
  componentWillMount() {
    const { useremail } = this.props;
    this.setState({
      email: useremail
    });
  }
  componentWillReceiveProps(nextProps) {
    const { useremail } = this.props;
    if (nextProps.updated) {
      this.setState({
        ...initialState,
        email: useremail
      });
    }
  }
  onSubmitValidator = () => {
    const { email, name, pincode, address1, address2, address3, phone } = this.state;
    const nameError = isEmpty(name);
    const emailError = isEmpty(email) || !validateEmail(email);
    const phoneError = isEmpty(phone) || validateMobile(phone).error;
    const pincodeError = isEmpty(pincode) || validatePincode(pincode);
    const address1Error = validateAddress(address1, 'address1');
    const address2Error = validateAddress(address2, 'address2');
    const address3Error = validateAddress(address3, 'address3');
    this.setState({
      nameError,
      emailError,
      phoneError,
      pincodeError,
      address1Error: address1Error.error,
      address2Error: address2Error.error,
      address3Error: address3Error.error
    });

    if (
      nameError ||
      emailError ||
      phoneError ||
      pincodeError ||
      address1Error.error ||
      address2Error.error ||
      address3Error.error
    ) {
      return false;
    }
    return true;
  };
  onChangeName = e => {
    const {
      target: { value }
    } = e;
    const check = validateName(value).error;
    this.setState({
      name: value,
      nameError: check,
      nameErrorMessage: validateName(value).msg
    });
  };
  onChangeAddress = (e, key) => {
    const {
      target: { value }
    } = e;
    const checkError = validateAddress(value, key);
    const addressValue = {};
    const addressErrorValue = {};
    const addressErrorMsg = {};
    const errorKey = `${key}Error`;
    const errorMsgKey = `${key}ErrorMessage`;
    addressValue[key] = value.slice(0, 41);
    addressErrorValue[errorKey] = checkError.error;
    addressErrorMsg[errorMsgKey] = checkError.errorMessage;
    this.setState({
      ...addressValue,
      ...addressErrorValue,
      ...addressErrorMsg
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
  onChangePincode = e => {
    const {
      target: { value }
    } = e;
    const checkError = validatePincode(value);
    if (!allowNChar(value, 6) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      pincode: value,
      pincodeError: checkError
    });
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
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleClick = index => {
    const { data } = this.props;
    const {
      full_name: name,
      address1,
      address2,
      address3,
      pincode,
      mobile: phone,
      email,
      id_customer_address: addressId
    } = data[index];
    const address1Data = validateAddress(address1, 'address1');
    const address2Data = validateAddress(address2, 'address2');
    const address3Data = validateAddress(address3, 'address3');
    const address1Error = address1Data.error;
    const address1ErrorMessage = address1Data.errorMessage;
    const address2Error = address2Data.error;
    const address2ErrorMessage = address2Data.errorMessage;
    const address3Error = address3Data.error;
    const address3ErrorMessage = address3Data.errorMessage;
    this.setState({
      addForm: false,
      editForm: true,
      currentaddressindex: index,
      email,
      address1,
      address2,
      address3,
      address1Error,
      address1ErrorMessage,
      address2Error,
      address2ErrorMessage,
      address3Error,
      address3ErrorMessage,
      pincode,
      phone,
      name,
      addressId
    });
  };
  handleSubmit = e => {
    const { dispatch } = this.context.store;
    e.preventDefault();
    const { editForm } = this.state;
    if (this.onSubmitValidator()) {
      if (editForm) {
        dispatch(updateAddress(this.state));
      } else {
        dispatch(addAddress(this.state));
      }
    }
  };
  toggleAddAddresForm = () => {
    this.setState({
      addForm: true,
      editForm: false,
      address1: '',
      address2: '',
      address3: '',
      pincode: '',
      phone: '',
      name: ''
    });
  };
  checkDisabled = () => {
    const { address1Error, address2Error, address3Error, phoneError, pincodeError, nameError, gstError } = this.state;
    const check =
      address1Error || address2Error || address3Error || phoneError || pincodeError || nameError || gstError;
    return check;
  };
  render() {
    const {
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      pincodeError,
      pincodeErrorMessage,
      address1Error,
      address1ErrorMessage,
      address2Error,
      address2ErrorMessage,
      address3Error,
      address3ErrorMessage,
      nameError,
      nameErrorMessage
    } = this.state;
    const { name, phone, address1, address2, address3, pincode, editForm, addForm, currentaddressindex } = this.state;
    const { data, useremail } = this.props;
    const { loading } = this.props;
    return (
      <Section display="flex" pt="1.5rem" pb="2rem" mb="0" height="auto" bg="sectionBgDark">
        <Container type="container" pr="0" pl="0">
          <Row display="block" mr="0" ml="0">
            {data.map((item, index) => (
              <Div col="12" key={String(index)}>
                <button
                  className={`${styles.addressBtn} ${index === currentaddressindex && styles.active}`}
                  onClick={() => this.handleClick(index)}
                >
                  <b>{item.full_name}</b>
                  <br />
                  {item.address1 || ''}
                  {item.address2 && <br />}
                  {item.address2 || ''}
                  {item.address3 && <br />}
                  {item.address3 || ''}
                  <br />
                  {item.city}, {item.pincode}
                  <br />
                  {item.state}
                  <br />
                </button>
              </Div>
            ))}
            <Div col="12">
              <button className={styles.addAddressBtn} onClick={this.toggleAddAddresForm}>
                <img src={addIcon} alt="Add another address" />
                <Text color="rgba(0, 0, 0, 0.6)" ta="center">
                  Add address
                </Text>
              </button>
            </Div>
          </Row>
          {editForm && (
            <form onSubmit={this.handleSubmit}>
              <Row display="block" mr="0" ml="0" mt="1rem">
                <Div col="12">
                  <FormInput
                    label="Full Name *"
                    type="text"
                    placeholder=""
                    onChange={this.onChangeName}
                    value={name}
                    feedBackError={nameError}
                    feedBackMessage={nameErrorMessage}
                  />
                  <FormInput
                    label="Flat, House no., Building, Apartment: *"
                    type="text"
                    placeholder=""
                    onChange={e => {
                      this.onChangeAddress(e, 'address1');
                    }}
                    value={address1}
                    feedBackError={address1Error}
                    feedBackMessage={address1ErrorMessage}
                  />
                  <FormInput
                    label="Area, Colony, Street, Sector: "
                    type="text"
                    placeholder=""
                    onChange={e => {
                      this.onChangeAddress(e, 'address2');
                    }}
                    value={address2}
                    feedBackError={address2Error}
                    feedBackMessage={address2ErrorMessage}
                  />
                  <FormInput
                    label="Landmark,Village: "
                    type="text"
                    placeholder=""
                    onChange={e => {
                      this.onChangeAddress(e, 'address3');
                    }}
                    value={address3}
                    feedBackError={address3Error}
                    feedBackMessage={address3ErrorMessage}
                  />
                  <FormInput
                    label="Phone *"
                    type="text"
                    placeholder=""
                    onChange={this.onChangePhone}
                    value={phone}
                    feedBackError={phoneError}
                    feedBackMessage={phoneErrorMessage}
                  />
                  <FormInput
                    label="PIN Code *"
                    type="text"
                    placeholder=""
                    onChange={this.onChangePincode}
                    value={pincode}
                    feedBackError={pincodeError}
                    feedBackMessage={pincodeErrorMessage}
                  />
                  {/* <FormInput
                    label="Email ID *"
                    type="text"
                    placeholder=""
                    onChange={this.onChangeEmail}
                    value={useremail}
                    feedBackError={emailError}
                    feedBackMessage={emailErrorMessage}
                  /> */}
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0">
                <Div col="12">
                  <Button
                    size="block"
                    btnType="primary"
                    fontFamily="regular"
                    height="42px"
                    mt="1rem"
                    onClick={this.handleSubmit}
                    disabled={this.checkDisabled()}
                  >
                    {loading ? 'Please wait ...' : 'Save'}
                  </Button>
                </Div>
              </Row>
            </form>
          )}
          {addForm && (
            <form onSubmit={this.handleSubmit}>
              <Row display="block" mr="0" ml="0" mt="1rem">
                <Div col="12">
                  <FormInput
                    label="Full Name *"
                    type="text"
                    placeholder=""
                    onChange={this.onChangeName}
                    value={name}
                    feedBackError={nameError}
                    feedBackMessage={nameErrorMessage}
                  />
                  <FormInput
                    label="Flat, House no., Building, Apartment: *"
                    type="text"
                    placeholder=""
                    onChange={e => {
                      this.onChangeAddress(e, 'address1');
                    }}
                    value={address1}
                    feedBackError={address1Error}
                    feedBackMessage={address1ErrorMessage}
                  />
                  <FormInput
                    label="Area, Colony, Street, Sector: "
                    type="text"
                    placeholder=""
                    onChange={e => {
                      this.onChangeAddress(e, 'address2');
                    }}
                    value={address2}
                    feedBackError={address2Error}
                    feedBackMessage={address2ErrorMessage}
                  />
                  <FormInput
                    label="Landmark,Village: "
                    type="text"
                    placeholder=""
                    onChange={e => {
                      this.onChangeAddress(e, 'address3');
                    }}
                    value={address3}
                    feedBackError={address3Error}
                    feedBackMessage={address3ErrorMessage}
                  />
                  <FormInput
                    label="Phone *"
                    type="text"
                    placeholder=""
                    onChange={this.onChangePhone}
                    value={phone}
                    feedBackError={phoneError}
                    feedBackMessage={phoneErrorMessage}
                  />
                  <FormInput
                    label="PIN Code *"
                    type="text"
                    placeholder=""
                    onChange={this.onChangePincode}
                    value={pincode}
                    feedBackError={pincodeError}
                    feedBackMessage={pincodeErrorMessage}
                  />
                  {/* <FormInput
                    label="Email ID *"
                    type="text"
                    placeholder=""
                    onChange={this.onChangeEmail}
                    value={useremail}
                    feedBackError={emailError}
                    feedBackMessage={emailErrorMessage}
                  /> */}
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0">
                <Div col="12">
                  <Button
                    size="block"
                    btnType="primary"
                    fontFamily="regular"
                    height="42px"
                    mt="1rem"
                    onClick={this.handleSubmit}
                    disabled={this.checkDisabled()}
                  >
                    {loading ? 'Please wait ...' : 'Save'}
                  </Button>
                </Div>
              </Row>
            </form>
          )}
        </Container>
      </Section>
    );
  }
}

DeliveryAddress.defaultProps = {
  data: [],
  useremail: '',
  loading: false,
  updated: false
};

DeliveryAddress.propTypes = {
  data: PropTypes.array,
  useremail: PropTypes.string,
  loading: PropTypes.bool,
  updated: PropTypes.bool
};
