import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Div from 'hometown-components/lib/Div';
import Container from 'hometown-components/lib/Container';
import Heading from 'hometown-components/lib/Heading';
import ProductInline from 'hometown-components/lib/ProductInline';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import { Label } from 'hometown-components/lib/Label';
import Span from 'hometown-components/lib/Span';
import Section from 'hometown-components/lib/Section';
import ShippedTo from 'hometown-components/lib/ShippedTo';
import Theme from 'hometown-components/lib/Theme';
import { formatAmount } from 'utils/formatters';
import { bindActionCreators } from 'redux';
import { submitPaymentDetails } from 'redux/modules/paymentoptions';
import { validatePaymentDetails } from 'utils/validation';
import { formatProductURL } from 'utils/helper';
import { getCartList, getNotDelivered, getStockOutProducts } from 'selectors/cart';

import PaymentForm from './PaymentForm';

const styles = require('../Cart/Cart.scss');
const summarystyles = require('./OrderSummary.scss');
const calendarImage = require('../../../static/calendar.svg');
const assemblyIcon = require('../../../static/cube-of-notes-stack.svg');

const nextStep = (dispatcher, sessionId, paymentData, cardType) => e => {
  e.preventDefault();
  dispatcher(sessionId, paymentData, cardType);
};

const mapStateToProps = ({ cart, cart: { summary, error }, address, paymentoptions, app }) => ({
  summary,
  error,
  address,
  paymentDetails: paymentoptions.paymentMethodDetails,
  gateway: paymentoptions.selectedGateway,
  sessionId: app.sessionId,
  paymentFormData: paymentoptions.formData,
  paymentError: paymentoptions.error,
  cardType: paymentoptions.cardType,
  submitting: paymentoptions.submitting,
  results: getCartList(cart),
  undelivered: getNotDelivered(cart),
  outOfStockList: getStockOutProducts(cart),
  cart
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitDetails: submitPaymentDetails
    },
    dispatch
  );

@withRouter
class ReviewOrder extends Component {
  componentDidMount() {
    const { paymentDetails, history } = this.props;
    if (validatePaymentDetails(paymentDetails)) {
      history.push('/checkout/delivery-address');
    }
  }
  render() {
    const {
      results,
      address,
      paymentDetails,
      submitDetails,
      sessionId,
      paymentFormData,
      cardType,
      submitting,
      undelivered,
      outOfStockList,
      cart
    } = this.props;
    const isProductOutofStock = sku => outOfStockList.includes(sku);
    const {
      summary: {
        items_count: totalCount,
        total: totalCart,
        savings,
        shipping_charges: shipping,
        coupon_discount: discount,
        items: itemsTotal
      }
    } = cart;

    return (
      <Div type="block">
        {paymentFormData && <PaymentForm />}
        <Section mb="0.3125rem" p="0.5rem" pr="0.5rem" pl="0.5rem" pt="0.3125rem">
          <Container type="container" pr="0.625rem" pl="0.625rem">
            <Row display="block" mr="0" ml="0">
              <Heading fontSize="1.25rem" pb="2px" color="textDark" mb="0px" mt="0px" fontFamily="light">
                Review & Order
              </Heading>
            </Row>
          </Container>
        </Section>
        <Section pt="1.25rem" bg="sectionBgDark" pb="80px" mb="0" display="flex">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row display="block" mr="0" ml="0">
              <Div col="12" bg="#969696">
                <Heading
                  fontSize="1rem"
                  ls="1px"
                  mb="0.3125rem"
                  mt="0.3125rem"
                  color="white"
                  p="10px 20px"
                  pb="10px"
                  fontFamily="light"
                >
                  Order Summary
                </Heading>
              </Div>
            </Row>
            <Row display="block" mr="0" ml="0" mb="1.25rem">
              {results.map(item => (
                <Div className={styles.prodInlineBlockWrapper} key={item.id_customer_cart}>
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
                      <ReactTooltip globalEventOff="click" />
                      {/* eslint-enable */}
                    </Div>
                  )}
                  {(!item.product_info.is_deliverable || isProductOutofStock(item.configurable_sku)) && (
                    <div className={styles.loadingCart}>
                      <h4>
                        {/* eslint-disable*/}
                        {isProductOutofStock(item.configurable_sku)
                          ? 'This product is out of stock please remove before proceed.'
                          : "Sorry, this product isn't available to selected pincode"}
                        <br />
                        {/* eslint-enable */}
                        <Link to="/checkout/delivery-address">
                          <Label fontSize="1rem" fontFamily="light" color="primary" p="0" mt="10px" mb="0">
                            Edit Address
                          </Label>
                        </Link>
                        <Link to="/checkout/cart">
                          <Label fontSize="1rem" fontFamily="light" color="primary" p="0" mt="10px" mb="0">
                            / Edit Cart
                          </Label>
                        </Link>
                      </h4>
                    </div>
                  )}
                </Div>
              ))}
              <ShippedTo
                name={address.shipping.fullName}
                address={address.shipping.address}
                city={address.shipping.city}
                pincode={address.shipping.pincode}
                state={address.shipping.state}
                mt="0.3125em"
                mb="0.3125em"
              />
            </Row>
            <Row ml="0" mr="0" mb="1.5rem">
              <Div col="12" className={summarystyles.orderSummary}>
                <Text color="#6e6e6e" mt="0">
                  Total Price ({totalCount} item
                  {totalCount === 1 ? '' : 's'})
                  <Span float="right" color={Theme.colors.text}>
                    Rs.{itemsTotal ? formatAmount(itemsTotal) : null}
                  </Span>
                </Text>
                <Text color="#6e6e6e">
                  Savings
                  <Span float="right" color={Theme.colors.text}>
                    Rs.{savings ? formatAmount(savings) : 0}
                  </Span>
                </Text>
                <Text color="#6e6e6e">
                  Shipping
                  <Span float="right" color={Theme.colors.text}>
                    {shipping === 0 ? 'Free' : `Rs.${shipping}`}
                  </Span>
                </Text>
                {discount > 0 && (
                  <Text color="#6e6e6e">
                    Discount
                    <Span float="right" color={Theme.colors.text}>
                      Rs.{` -${formatAmount(Number(discount))}`}
                    </Span>
                  </Text>
                )}
                <Text color="#6e6e6e" mb="0" fontSize="2rem" className={summarystyles.totalWrapper} fontFamily="light">
                  Total
                  <Span float="right" color={Theme.colors.text} mt="10px" fontSize="1.25rem">
                    Rs.{totalCart ? formatAmount(totalCart) : null}
                  </Span>
                </Text>
                <Text color="rgba(0,0,0,0.4)" mt="-5px" mb="0.3125rem">
                  (inclusive of all taxes)
                </Text>
              </Div>
            </Row>
          </Container>
        </Section>
        <Section className="staticAtBottom" p="10px 0" mt="0" mb="0">
          <Row display="block" mr="15px" ml="15px">
            <Button
              btnType="primary"
              size="block"
              fontWeight="regular"
              fontSize="0.875em"
              height="42px"
              lh="2"
              onClick={nextStep(submitDetails, sessionId, paymentDetails, cardType)}
              disabled={undelivered.length > 0 || outOfStockList.length > 0 || submitting}
            >
              Place Order
            </Button>
          </Row>
        </Section>
      </Div>
    );
  }
}
ReviewOrder.defaultProps = {
  history: {},
  paymentFormData: {},
  // paymentError: [],
  cardType: 'other',
  submitting: false,
  undelivered: [],
  outOfStockList: []
};
ReviewOrder.propTypes = {
  results: PropTypes.array.isRequired,
  cart: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  paymentDetails: PropTypes.object.isRequired,
  submitDetails: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  // gateway: PropTypes.string.isRequired,
  history: PropTypes.object,
  paymentFormData: PropTypes.object,
  // paymentError: PropTypes.array,
  cardType: PropTypes.string,
  submitting: PropTypes.bool,
  undelivered: PropTypes.array,
  outOfStockList: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);
