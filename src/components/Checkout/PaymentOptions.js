import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';
import ProductInline from 'hometown-components/lib/ProductInline';

import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';

import {
  setSelectedGateway,
  setSelectedPaymentDetails,
  submitPaymentDetails,
  checkPaymentDetails,
  setValidationError,
  resetEasyEmiState
} from 'redux/modules/paymentoptions';
import { paymentLoaded } from 'redux/modules/app';

// Utils - Helpers - Selectors
import { formatAmount } from 'utils/formatters';
import { formatProductURL } from 'utils/helper';
import { getCartList, getNotDelivered, getStockOutProducts } from 'selectors/cart';

import PaymentForm from './PaymentForm';
import CommonPayments from './CommonPayments';
import PaymentBreadcrumb from './PaymentBreadcrumb';
import Notification from './Notification';

import { validatePaymentDetails, validateVPA } from '../../utils/validation';

const calendarImage = require('../../../static/calendar.svg');
const assemblyIcon = require('../../../static/cube-of-notes-stack.svg');
const LoaderIcon = require('../../../static/refresh-white.svg');

const styles = require('./Checkout.scss');
const reviewStyles = require('../Cart/Cart.scss');

// const nextStep = history => e => {
//   e.preventDefault();
//   history.push('/checkout/review-order');
// };

const nextStep = (
  dispatcher,
  paymentload,
  sessionId,
  paymentData,
  cardType,
  isCreditSelected,
  selectedGateway,
  paymentMethodDetails,
  total
) => e => {
  e.preventDefault();
  paymentload(false);
  dispatcher(sessionId, paymentData, cardType, isCreditSelected, selectedGateway, paymentMethodDetails, total);
};

const mapStateToProps = ({
  app,
  paymentoptions,
  cart: { checkingCart, cartChecked, summary },
  app: { sessionId },
  cart,
  profile,
  checkout
}) => ({
  selectedGateway: paymentoptions.selectedGateway,
  isCreditSelected: paymentoptions.isCreditSelected,
  paymentMethodDetails: paymentoptions.paymentMethodDetails,
  isFormValid: paymentoptions.isFormValid,
  paymentDetails: paymentoptions.paymentMethodDetails,
  checkingCart,
  cartChecked,
  summary,
  sessionId,
  error: paymentoptions.error,
  submitting: paymentoptions.submitting,
  submitted: paymentoptions.submitted,
  cardType: paymentoptions.cardType,
  paymentFormData: paymentoptions.formData,
  session: app.sessionId,
  results: getCartList(cart),
  undelivered: getNotDelivered(cart),
  warningFlag: checkout.nextstep.warningFlag,
  outOfStockList: getStockOutProducts(cart)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleGateway: setSelectedGateway,
      setPaymentDetails: setSelectedPaymentDetails,
      validateForm: checkPaymentDetails,
      submitDetails: submitPaymentDetails,
      paymentLoadedStatus: paymentLoaded,
      setError: setValidationError,
      resetEasyEmi: resetEasyEmiState
    },
    dispatch
  );
const validateInput = details => {
  if (details.Upi) {
    const {
      Upi: { upi_vpa: vpa }
    } = details;
    return !validateVPA(vpa);
  }
  return false;
};
@withRouter
class PaymentOptions extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  render() {
    const {
      data,
      selectedGateway,
      paymentMethodDetails,
      toggleGateway,
      setPaymentDetails,
      paymentLoadedStatus,
      submitting,
      session,
      paymentDetails,
      results,
      undelivered,
      outOfStockList,
      submitDetails,
      cardType,
      paymentFormData,
      resetEasyEmi,
      submitted,
      error,
      summary: { total },
      warningFlag,
      isCreditSelected
    } = this.props;
    const isProductOutofStock = sku => outOfStockList.includes(sku);

    return (
      <Div mt="8px" type="block" className={styles.paymentOptionsWrapper}>
        {paymentFormData && <PaymentForm />}
        {results.map(item => (
          <Div key={item.product_info.name}>
            {(!item.product_info.is_deliverable || isProductOutofStock(item.configurable_sku)) && (
              <Section
                key={item.configurable_sku}
                bg="sectionBgDark"
                mb="0"
                p="0.5rem 1rem"
                display="flex"
                className={reviewStyles.paymentOptionSection}
              >
                <Container type="container" pr="0" pl="0">
                  <Row display="block" mr="0" ml="0" mb="0">
                    <Div className={reviewStyles.prodInlineBlockWrapperReview} key={item.id_customer_cart}>
                      <ProductInline
                        name={item.product_info.name}
                        image={item.product_info.image}
                        specialPrice={item.product_info.special_price}
                        unitPrice={item.product_info.unit_price}
                        savings={item.product_info.unit_price - item.product_info.net_price}
                        qty={item.qty}
                        formatAmount={formatAmount}
                        productURL={formatProductURL(item.product_info.name, item.configurable_sku)}
                      />
                      <Div col={item.product_info.assembly_service ? '6' : '12'} mt="0.3125rem">
                        <Img
                          width="initial"
                          height="20px"
                          mb="2.5rem"
                          mr="0.625rem"
                          mt="3px"
                          float="left"
                          src={calendarImage}
                        />
                        <Text color="#575757" fontSize="0.625rem" mt="0" mb="0">
                          Delivery Details
                        </Text>
                        <Text
                          color={item.product_info.delivery_time_text.indexOf('Sorry') === -1 ? 'green' : 'red'}
                          fontSize="0.75rem"
                          mt="0"
                        >
                          {item.product_info.delivery_time_text}
                        </Text>
                      </Div>
                      {item.product_info.assembly_service && (
                        <Div col="6" color="uspTitle" fontSize="0.75rem" mt="0.3125rem">
                          <Img
                            width="initial"
                            height="20px"
                            mr="0.625rem"
                            mt="4px"
                            mb="50px"
                            float="left"
                            src={assemblyIcon}
                          />
                          <Text color="#575757" fontSize="0.75rem" mt="0" mb="0">
                            Assembly
                          </Text>
                          <Text fontSize="0.75rem" mt="0" mb="0">
                            Offered By Hometown
                          </Text>
                          {/* eslint-disable */}
                          <a
                            data-tip="Assembly will be done within 48hrs of Delivery & applicable within serviceable limits"
                            data-event="click focus"
                            className="detailsLink"
                          >
                            Details
                          </a>
                          {/* eslint-enable */}
                        </Div>
                      )}
                      <div className={reviewStyles.loadingCart}>
                        <h4>
                          {/* eslint-disable*/}
                          {isProductOutofStock(item.configurable_sku)
                            ? 'This product is out of stock please remove before proceed.'
                            : "Sorry, this product isn't available to selected pincode"}
                          <br />

                          {/* eslint-enable */}
                          {isProductOutofStock(item.configurable_sku) ? (
                            <Link to="/checkout/cart">
                              <Label
                                fontSize="0.875rem"
                                fontFamily="light"
                                color="primary"
                                p="0"
                                ml="0.3125rem"
                                mt="10px"
                                mb="0"
                              >
                                Edit Cart
                              </Label>
                            </Link>
                          ) : (
                            <Link to="/checkout/delivery-address">
                              <Label
                                fontSize="0.875rem"
                                fontFamily="light"
                                color="primary"
                                p="0"
                                mr="0.3125rem"
                                mt="10px"
                                mb="0"
                              >
                                Edit Address
                              </Label>
                            </Link>
                          )}
                        </h4>
                      </div>
                    </Div>
                  </Row>
                </Container>
              </Section>
            )}
          </Div>
        ))}
        {!undelivered.length ? (
          <Div>
            <PaymentBreadcrumb />

            {warningFlag === 1 ? (
              <Div>
                <Notification message="You have an Order pending for payment, Please wait for the payment confirmation." />
              </Div>
            ) : warningFlag === 2 ? (
              <Div>
                <Notification message="You have already bought some of current cart products in last order." />
              </Div>
            ) : null}
            <Section pt="0" mb="0" pb="75px" display="flex">
              <Container type="container" pr="0.625rem" pl="0.625rem">
                <Row display="block" mr="0" ml="0" mb="3rem">
                  <Div col="12">
                    {data.map(paymentType =>
                      CommonPayments(
                        paymentType.paymentType,
                        toggleGateway,
                        selectedGateway,
                        setPaymentDetails,
                        paymentType,
                        session,
                        paymentDetails,
                        resetEasyEmi,
                        total
                      )
                    )}
                  </Div>
                </Row>
              </Container>
            </Section>
            <Div className={styles.reviewOrderBtnWrapper}>
              <Label color="text" fontFamily="regular" fontSize="18px" lh="1.5" mb="0.625rem" mt="0">
                Cart Subtotal :
              </Label>
              <Label className={styles.totalCartPrice} color="textDark" fontWeight="700" fontSize="18px">
                {' '}
                Rs.{total ? formatAmount(total) : null}
              </Label>
              <div
                onClick={() => {
                  window.dataLayer.push({ ecommerce: null });
                  window.dataLayer.push({
                    event: 'add_payment_info',
                    pagetype: '',
                    source_page_url: window.location.href,
                    previous_page_url: '',
                    destination_page_url: '',
                    login_status: '',
                    user_id: '',
                    page_url: window.location.href,
                    banner_id: '',
                    click_text: submitting ? 'Please wait...' : 'Place Order',
                    ecommerce: {
                      currency: 'INR',
                      value: this.props.summary,
                      coupon: this.props.summary,
                      payment_type: this.props.selectedGateway,
                      items: this.props.results.map((result, idx) => {
                        return {
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
                        };
                      })
                    }
                  });
                }}
              >
              <Button
                size="block"
                btnType="primary"
                fontWeight="400"
                p="0.625rem .75rem"
                fontSize="14px"
                style={{
                  color: '#F47020',
                  backgroundColor: 'white',
                  border: '1px solid #F47020'
                }}
                
                // onClick={nextStep(history)}
                onClick={nextStep(
                  submitDetails,
                  paymentLoadedStatus,
                  session,
                  paymentDetails,
                  cardType,
                  isCreditSelected,
                  selectedGateway,
                  paymentMethodDetails,
                  total
                )}
                disabled={
                  validateInput(paymentDetails) ||
                  validatePaymentDetails(paymentDetails) ||
                  undelivered.length > 0 ||
                  outOfStockList.length > 0 ||
                  submitting ||
                  (submitted && error === null)
                }
              >
                  {submitting && (
                    <Img mr="10px" className="spin" src={LoaderIcon} display="inline" width="20px" va="sub" />
                  )}
                  {submitting ? 'Please wait...' : 'Place Order'}
              </Button>
              </div>
            </Div>
          </Div>
        ) : null}
      </Div>
    );
  }
}

PaymentOptions.defaultProps = {
  selectedGateway: 'creditcard',
  paymentMethodDetails: {},
  data: [],
  submitting: false,
  session: '',
  undelivered: [],
  outOfStockList: [],
  cardType: 'other',
  paymentFormData: {},
  submitted: false,
  error: null,
  summary: {},
  warningFlag: ''
};

PaymentOptions.propTypes = {
  selectedGateway: PropTypes.string,
  paymentMethodDetails: PropTypes.object,
  data: PropTypes.array,
  toggleGateway: PropTypes.func.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  session: PropTypes.string,
  paymentDetails: PropTypes.object.isRequired,
  submitDetails: PropTypes.func.isRequired,
  paymentLoadedStatus: PropTypes.func.isRequired,
  paymentFormData: PropTypes.object,
  cardType: PropTypes.string,
  submitting: PropTypes.bool,
  results: PropTypes.array.isRequired,
  undelivered: PropTypes.array,
  outOfStockList: PropTypes.array,
  resetEasyEmi: PropTypes.func.isRequired,
  submitted: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  warningFlag: PropTypes.string,
  summary: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentOptions);
