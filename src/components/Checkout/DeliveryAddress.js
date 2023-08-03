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
import { Label } from 'hometown-components/lib/Label';
import Heading from 'hometown-components/lib/Heading';
import { sendDeliveryAddress, resetGuestRegisterFlag } from 'redux/modules/checkout';
import { load } from 'redux/modules/paymentoptions';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/address';
import { notifSend } from 'redux/modules/notifs';
import { loadCart } from 'redux/modules/cart';
import { isBlank } from 'js-utility-functions';
import { validateAddress } from 'utils/validation';
import AddressForm from './AddressForm';

const addIcon = require('../../../static/cart/addAddressicon.svg');
const BackIcon = require('../../../static/cart/back.svg');
const CloseIcon = require('../../../static/cart/close.svg');
const styles = require('./DeliveryAddress.scss');

const mapStateToProps = ({ userLogin, app, checkout, myaddress, address, profile, cart }) => ({
  paymentData: checkout.paymentData,
  isLoggedIn: userLogin.isLoggedIn,
  sessionId: app.sessionId,
  nextstep: checkout.nextstep,
  loading: checkout.loading,
  showAddAddress: checkout.showAddAddress,
  addresses: myaddress.data,
  currentaddressindex: address.shipping.index,
  addNewAddress: address.addNewAddress,
  shippingIsBilling: address.shippingIsBilling,
  userEmail: profile.data.email,
  address,
  cart
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators, loadCart }, dispatch);

@withRouter
class DeliveryAddress extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    addressform: false
  };
  componentDidMount() {
    const { dispatch } = this.context.store;
    const { cart, history } = this.props;
    const { nextstep, isLoggedIn, onChangeEmail, userEmail } = this.props;
    if (isLoggedIn) {
      onChangeEmail('shipping', userEmail);
      onChangeEmail('billing', userEmail);
    }
    if (nextstep.success) {
      dispatch(resetGuestRegisterFlag());
    }
    if (!cart.cartCheckData) {
      history.push('/checkout/cart');
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      isLoggedIn,
      nextstep,
      clearShippingAddress,
      onChangeEmail,
      userEmail,
      cart,
      showAddAddress,
      AddNewAddress
    } = this.props;
    const { dispatch } = this.context.store;
    if (nextProps.nextstep !== nextstep && nextProps.paymentData) {
      const { paymentData = {} } = nextProps;
      dispatch(
        load({
          paymentData,
          cart
        })
      );
    }
    if (isLoggedIn && nextProps.userEmail !== userEmail) {
      onChangeEmail('shipping', nextProps.userEmail);
      onChangeEmail('billing', nextProps.userEmail);
    }
    if (nextProps.isLoggedIn !== isLoggedIn) {
      clearShippingAddress();
    }
    if (nextProps.nextstep.success && nextProps.nextstep.success !== nextstep.success) {
      const { history } = this.props;
      history.push('/checkout/payment-options');
    }
    if (nextProps.showAddAddress !== showAddAddress) {
      if (!showAddAddress) {
        dispatch(AddNewAddress(false));
      }
    }
  }
  loginHandler = () => {
    const { history, location } = this.props;
    history.push(`/login?redirect=${location.pathname}`);
  };
  toggleAddAddress = e => {
    const { setAddress, isLoggedIn, userEmail, AddNewAddress } = this.props;
    e.preventDefault();
    this.setState({
      addressform: !this.state.addressform
    });
    const data = {
      full_name: '',
      email: isLoggedIn ? userEmail : '',
      pincode: '',
      mobile: '',
      address1: '',
      address2: '',
      address3: '',
      city: '',
      state: '',
      index: null
    };
    setAddress('shipping', data, null);
    AddNewAddress(!this.state.addressform);
  };
  checkParams = () => {
    const {
      address: {
        billing: {
          addressFeedBackError1: Badd1,
          addressFeedBackError2: Badd2,
          addressFeedBackError3: Badd3,
          cityFeedBackError: Bcity,
          emailFeedBackError: Bemail,
          fullNameFeedBackError: Bname,
          gstFeedBackError: Bgst,
          phoneFeedBackError: Bphone,
          pincodeFeedBackError: Bpincode,
          stateFeedBackError: Bstate
        },
        shipping: {
          addressFeedBackError1: Sadd1,
          addressFeedBackError2: Sadd2,
          addressFeedBackError3: Sadd3,
          cityFeedBackError: Scity,
          emailFeedBackError: Semail,
          fullNameFeedBackError: Sname,
          gstFeedBackError: Sgst,
          phoneFeedBackError: Sphone,
          pincodeFeedBackError: Spincode,
          stateFeedBackError: Sstate
        }
      }
    } = this.props;
    const check =
      Badd1 ||
      Badd2 ||
      Badd3 ||
      Bcity ||
      Bemail ||
      Bname ||
      Bgst ||
      Bphone ||
      Bpincode ||
      Bstate ||
      Sadd1 ||
      Sadd2 ||
      Sadd3 ||
      Scity ||
      Semail ||
      Sname ||
      Sgst ||
      Sphone ||
      Spincode ||
      Sstate;
    return check;
  };
  formValdiator = (props, data, formType) => {
    const {
      fullName,
      fullNameFeedBackError,
      email,
      emailFeedBackError,
      phone,
      phoneFeedBackError,
      address1,
      addressFeedBackError1,
      address2,
      addressFeedBackError2,
      address3,
      addressFeedBackError3,
      city,
      pincode,
      pincodeFeedBackError,
      state,
      gst
    } = data;
    const {
      setNameError,
      setPhoneError,
      setEmailError,
      setAddressError1,
      setAddressError2,
      setAddressError3,
      setPincodeError
    } = props;
    // const { addressform } = this.state;
    const fullNameError = isBlank(fullName) || fullNameFeedBackError;
    const emailError = isBlank(email) || emailFeedBackError;
    const phoneError = isBlank(phone) || phoneFeedBackError;
    const pincodeError = isBlank(pincode) || pincodeFeedBackError;
    const addressError1 = validateAddress(address1, 'address1').error || addressFeedBackError1;
    const addressError2 = validateAddress(address2, 'address2').error || addressFeedBackError2;
    const addressError3 = validateAddress(address3, 'address3').error || addressFeedBackError3;
    if (fullNameError || emailError || pincodeError || phoneError || addressError1 || addressError2 || addressError3) {
      setNameError(formType, fullNameError);
      setEmailError(formType, emailError);
      setPincodeError(formType, pincodeError);
      setPhoneError(formType, phoneError);
      setAddressError1(formType, addressError1);
      setAddressError2(formType, addressError2);
      setAddressError3(formType, addressError3);
      return {
        error: true,
        data: null
      };
    }
    return {
      error: false,
      data: {
        fullName,
        phone,
        email,
        pincode,
        address1,
        address2,
        address3,
        city,
        state,
        gst
      }
    };
  };
  handleSubmit = e => {
    e.preventDefault();
    const {
      address: { shipping, billing, shippingIsBilling },
      cart: {
        summary: { total: cartTotal }
      }
    } = this.props;
    const { dispatch } = this.context.store;
    const { isLoggedIn } = this.props;
    const { addressform } = this.state;
    if (shippingIsBilling) {
      const shippingForm = this.formValdiator(this.props, shipping, 'shipping');
      if (shippingForm.error) {
        const message =
          isLoggedIn && !addressform
            ? 'Please Add new Address  /  Select delivery Address '
            : 'Please Fill All Details Correctly !';
        dispatch(
          notifSend({
            type: 'warning',
            msg: message,
            dismissAfter: 2000
          })
        );
      } else {
        const { sessionId, AddNewAddress } = this.props;
        dispatch(
          sendDeliveryAddress(
            sessionId,
            {
              shippingIsBilling,
              shippingAddress: shippingForm.data,
              billingAddress: shippingForm.data,
              cartTotal
            },
            isLoggedIn
          )
        );
        // setTimeout(() => {
        //   AddNewAddress(false);
        // }, 2000);
      }
    } else {
      const shippingForm = this.formValdiator(this.props, shipping, 'shipping');
      const billingForm = this.formValdiator(this.props, billing, 'billing');
      if (shippingForm.error || billingForm.error) {
        dispatch(
          notifSend({
            type: 'warning',
            msg: 'Fill All Details Correctly',
            dismissAfter: 2000
          })
        );
      } else {
        const { sessionId, AddNewAddress } = this.props;
        dispatch(
          sendDeliveryAddress(sessionId, {
            shippingIsBilling,
            shippingAddress: shippingForm.data,
            billingAddress: billingForm.data,
            cartTotal
          })
        );
        // setTimeout(() => {
        //   AddNewAddress(false);
        // }, 2000);
      }
    }
  };

  toggleBillingForm = () => {
    const { toggleShippingIsBilling } = this.props;
    toggleShippingIsBilling();
  };

  handleClick = index => {
    const { addresses, setAddress, loadPincodeDetails } = this.props;
    this.setState({
      addressform: false
    });
    setAddress('shipping', addresses[index], index);
    loadPincodeDetails('shipping', addresses[index].pincode);
    loadCart('', addresses[index]);
  };

  isAddressSelected = () => {
    const { dispatch } = this.context.store;
    dispatch(
      notifSend({
        type: 'warning',
        msg: 'Please Add new Address  /  Select delivery Address ',
        dismissAfter: 2000
      })
    );
  };

  render() {
    const { isLoggedIn, loading, addresses, currentaddressindex } = this.props;
    const { shippingIsBilling, userEmail, addNewAddress } = this.props;
    const { addressform } = this.state;
    return (
      <Div type="block" mb="2rem" style={{ background: '#f7f7f7' }}>
        {!isLoggedIn && (
          <Section mb="0.3125rem" p="0px" mt="0px" style={{ background: '#FFFFFF' }}>
            <Container type="container" pr="0rem" pl="0rem" style={{ background: '#FFFFFF' }}>
              <Div
                mr="0"
                ml="0"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px',
                  marginBottom: '15px',
                  background: '#FFFFFF'
                }}
              >
                <button
                  style={{
                    border: '1px solid #F47020',
                    borderRadius: '4px',
                    padding: '15px 35px',
                    background: 'white',
                    color: '#F47020',
                    fontSize: '14px'
                  }}
                  onClick={this.loginHandler}
                >
                  Log in
                </button>
              </Div>
            </Container>
          </Section>
        )}
        {isLoggedIn && !addNewAddress && (
          <Div col="12" pb="0.625rem">
            <button className={styles.addAddressBtn} onClick={this.toggleAddAddress}>
              <Text color="rgb(0,0,0)" ta="left" mt="0" mb="0" ml="15px">
                <img className={styles.addAddressBtnIcon} src={addIcon} alt="Add New Address" />
                {addresses.length > 0 ? 'Add New Address' : 'Add Address'}
              </Text>
            </button>
          </Div>
        )}
        {addNewAddress && (
          <Div className={styles.addNewAddressHeader}>
            <Button bg="transparent" border="none" onClick={this.toggleAddAddress} p="0">
              {' '}
              <img src={BackIcon} alt="Close" /> <span>Add New Address</span>
            </Button>

            <Button bg="transparent" border="none" onClick={this.toggleAddAddress} p="0">
              {' '}
              <img src={CloseIcon} alt="Close" />{' '}
            </Button>
          </Div>
        )}
        <Section
          pt="1.25rem"
          mb="65px"
          height="calc(100vh - 160px)"
          of="auto"
          pb="175px"
          display="flex"
          style={{
            background: '#FFFFFF',
            marginTop: '15px',
            paddingLeft: '0px',
            paddingRight: '0px'
          }}
        >
          <Container type="container" pr="0" pl="0">
            {isLoggedIn && !addNewAddress && (
              <Row display="block" mr="0" ml="0" pl="15px" pr="15px">
                <Div
                  style={{
                    fontWeight: 600,
                    fontSize: '14px',
                    color: 'black',
                    marginBottom: '15px'
                  }}
                >
                  My Saved Addresses
                </Div>
                {addresses.map((item, index) => (
                  <Div col="12" pb="0.625rem" key={item.id_customer_address}>
                    <button className={`${styles.addressBtn}`} onClick={() => this.handleClick(index)}>
                      <div className={styles.customCheckbox}>
                        <div>
                          {index === currentaddressindex ? (
                            <div className={styles.checked}>
                              <div className={styles.filled} />
                            </div>
                          ) : (
                            <div className={styles.unchecked}></div>
                          )}
                        </div>
                        <div className={styles.checkboxLabel}> {item.full_name} </div>
                      </div>
                      {item.address1 && <br />}
                      {item.address1}
                      {item.address2 && <br />}
                      {item.address2}
                      {item.address3 && <br />}
                      {item.address3}
                      <br />
                      {item.city}, {item.pincode}
                      <br />
                      {item.state}
                      <br />
                      {item.gst || ''}
                    </button>
                  </Div>
                ))}
              </Row>
            )}
            {/* {!isLoggedIn && (
              <Div ml="0" mb="1.25rem">
                <Text mt="0" mb="0" color="textLight">
                  Have an existing account with hometown?
                </Text>
                <Button
                  btnType="custom"
                  bg="#515151"
                  color="#FFF"
                  fontWeight="regular"
                  height="42px"
                  mt="0.5rem"
                  fontSize="0.875rem"
                  p="0.375rem 2rem"
                  onClick={this.loginHandler}
                >
                  LOGIN
                </Button>
              </Div>
            )} */}
            <form onSubmit={this.handleSubmit}>
              {(addressform || !isLoggedIn) && (
                <Div style={{ background: '#FFFFFF' }} pl="15px" pr="15px">
                  {!isLoggedIn && (
                    <Div
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '15px',
                        color: '#323131'
                      }}
                    >
                      Or Continue As Guest
                    </Div>
                  )}
                  <AddressForm formType="shipping" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                </Div>
              )}

              <Row display="block" mr="0" ml="0" mt="1rem" mb="2.5rem">
                <Div col="12" mb="10x" style={{ marginBottom: '15px' }} pl="15px" pr="15px">
                  {/* <div className="checkbox">
                    <input
                      type="checkbox"
                      id="checkbox"
                      checked={!shippingIsBilling}
                      onChange={this.toggleBillingForm}
                    />
                    
                    <label htmlFor="checkbox" />
                  </div> */}
                  {/* eslint-disable */}
                  <div display="inline-block">
                    <label className={styles.checkbox_container} htmlFor="checkbox">
                      Billing Address Same As Shipping Address
                      <input
                        type="checkbox"
                        id="checkbox"
                        checked={shippingIsBilling}
                        onChange={this.toggleBillingForm}
                      />
                      <span className={styles.checkmark}></span>
                    </label>
                  </div>
                  {/* <Label fontSize="0.875rem" va="bottom" mt="0" mb="0" ml="0.625rem" htmlFor="checkbox">
                    Different Billing Address ?
                  </Label> */}
                </Div>
                <div
                  style={{
                    padding: '5px',
                    width: '100%',
                    background: '#f7f7f7',
                    marginTop: '35px'
                  }}
                />
                {!shippingIsBilling && (
                  <Row display="block" mr="0" ml="0" mt="1.5rem" mb="0" pl="15px" pr="15px">
                    <Div col="12">
                      <Div
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '15px',
                          color: '#323131'
                        }}
                      >
                        Add Billing Address
                      </Div>
                    </Div>
                    <AddressForm formType="billing" isLoggedIn={isLoggedIn} userEmail={userEmail} />
                  </Row>
                )}
              </Row>
            </form>
          </Container>
        </Section>
        <Div className={styles.deliverBtnWrapper}>
          <button
            style={{
              border: '1px solid #F47020',
              borderRadius: '4px',
              padding: '15px 35px',
              background: 'white',
              color: '#F47020',
              fontSize: '14px'
            }}
            // disabled={loading || this.checkParams()}
            disabled={loading}
            // onClick={
            //   isLoggedIn &&
            //   !addNewAddress &&
            //   (currentaddressindex === -1 || currentaddressindex === null)
            //     ? this.isAddressSelected
            //     : this.handleSubmit

            // }
            onClick={e => {
              isLoggedIn && !addNewAddress && (currentaddressindex === -1 || currentaddressindex === null)
                ? this.isAddressSelected(e)
                : this.handleSubmit(e);

              window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
              window.dataLayer.push({
                event: 'add_shipping_info',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: '',
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: 'CHECKOUT NOW',
                ecommerce: {
                  currency: 'INR',
                  value: this.props.cart.summary.total,
                  items: this.props.cart.data.map((result, idx) => ({
                    item_id: result.product_info.product_id,
                    item_name: result.product_info.name,
                    affiliation: '',
                    coupon: result.coupon_code,
                    discount: result.product_info.discount,
                    index: idx,
                    item_brand: result.product_info.brand,
                    item_category: '',
                    item_category2: '',
                    item_category3: '',
                    item_category4: '',
                    item_category5: '',
                    item_list_id: '',
                    item_list_name: '',
                    item_variant: result.product_info.color,
                    location_id: '',
                    price: result.product_info.net_price,
                    quantity: result.qty
                  }))
                }
              });
            }}
          >
            {loading ? 'Loading...' : 'Save and Continue'}
          </button>
        </Div>
      </Div>
    );
  }
}

DeliveryAddress.defaultProps = {
  history: {},
  location: {},
  addresses: [],
  currentaddressindex: -1,
  userEmail: ''
};
DeliveryAddress.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  sessionId: PropTypes.string.isRequired,
  history: PropTypes.object,
  addresses: PropTypes.array,
  nextstep: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  paymentData: PropTypes.object.isRequired,
  location: PropTypes.object,
  currentaddressindex: PropTypes.number,
  address: PropTypes.object.isRequired,
  shippingIsBilling: PropTypes.bool.isRequired,
  setAddress: PropTypes.func.isRequired,
  clearShippingAddress: PropTypes.func.isRequired,
  toggleShippingIsBilling: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  onChangeEmail: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  loadPincodeDetails: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress);
