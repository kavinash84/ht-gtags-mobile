import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import ProductInline from 'hometown-components/lib/ProductInline';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import { Label } from 'hometown-components/lib/Label';
import * as actionCreators from 'redux/modules/cart';
import * as actionCreatorsForDemo from 'redux/modules/selectForDemo';
import { formatProductURL } from 'utils/helper';
import { getStockOutProducts } from 'selectors/cart';
import { formatAmount } from 'utils/formatters';
import Row from 'hometown-components/lib/Row';
import CartBreadCumb from './breadDumb.js';
import DeliveryAddress from './deliveryAddress.js';
import ApplyCoupon from './applyCoupon.js';
import ProductItem from './product.js';
import Offers from './offers.js';
import PriceSummary from './summary.js';
import HappyToHelp from './happyToHelp.js';
import ApplayGiftWrapper from './applyGiftwrapper.js';
import { Link } from 'react-router-dom';

const styles = require('./Cart.scss');

const despatchSelectForDemo = (id, data, state, dispatchero) => {
  const {
    product_info: { demo_product: isDemoProduct }
  } = data;

  if (isDemoProduct) {
    const skuExists = state.some(arr => arr.simpleSku === id);
    const {
      simple_sku: simpleSku,
      product_info: { product_id: productId }
    } = data;

    if (skuExists) {
      state = state.filter(arr => arr.simpleSku !== id);
    } else {
      state.push({ productId, simpleSku });
    }

    dispatchero([...state]);
  }
};

const mapStateToProps = ({ pincode, cart, app, selectForDemo, coupon }) => ({
  currentId: cart.key,
  cartChecked: cart.cartChecked,
  cartTotal: cart.summary.total,
  cartContact: cart.contact,
  summary: cart.summary,
  appliedCoupon: cart.summary.coupon,
  checkingCart: cart.checkingCart,
  cartUpdating: cart.cartUpdating,
  pincode: pincode.selectedPincode,
  sessionId: app.sessionId,
  outOfStockList: getStockOutProducts(cart),
  demoLandingPageUrl: cart.demo_landing_page_url,
  selectForDemo: selectForDemo.data
  // appliedCoupon: coupon.appliedCoupon
});

const onClick = (
  cartId,
  sessionId,
  pincode,
  qty,
  configId,
  id,
  data,
  selectForDemo,
  appliedCoupon
) => dispatcher => dispatchero => e => {
  e.preventDefault();
  if (selectForDemo && selectForDemo.length !== 0) {
    despatchSelectForDemo(id, data, selectForDemo, dispatchero);
  }

  dispatcher(cartId, sessionId, pincode, qty, configId, appliedCoupon);
};

const isSelected = (id, state) => state.some(arr => arr.simpleSku === id);

const handleCheckboxClick = (id, data, state) => dispatchero => e => {
  despatchSelectForDemo(id, data, state, dispatchero);
};

const onDelete = (cartId, product, selectedForDemo) => addToSelectForDemo => {
  const skuExists = selectedForDemo.some(arr => arr.simpleSku === cartId);
  if (skuExists) {
    selectedForDemo = selectedForDemo.filter(arr => arr.simpleSku !== cartId);
    addToSelectForDemo([...selectedForDemo]);
  }
};

const getSkusData = data => {
  let arr = Object.keys(data);
  arr = arr.map(item => {
    return { simple_sku: item, qty: 1 };
  });
  return arr;
};

const Cart = ({
  demoProductsBanner,
  results,
  removeFromCart,
  pincode,
  sessionId,
  currentId,
  cartUpdating,
  outOfStockList,
  handlePincodeModal,
  demoLandingPageUrl,
  addToSelectForDemo,
  selectForDemo,
  cartTotal,
  appliedCoupon,
  summary,
  cartContact
}) => {
  const cartItemLoading = customerCardId => cartUpdating && currentId === customerCardId;
  const isProductOutofStock = sku => outOfStockList.includes(sku);
  return (
    <Div type="block">
      <Section mb="0px" p="0px" pr="0px" pl="0px">
        <Container type="container" pr="0px" pl="0px">
          <CartBreadCumb />
        </Container>
      </Section>
      <Section mb="0px" p="0px" pr="0px" pl="0px">
        <Container type="container" pr="0px" pl="0px">
          <DeliveryAddress />
        </Container>
      </Section>
      {/* <Row type="block" m="0" mb="0" mt="0">
        <Div>
          <Link to="/promotions">
            <Img src={cashbackBanner} alt="" />
          </Link>
        </Div>
      </Row> */}
      <Section mb="0px" p="0px" pr="0px" pl="0px">
        <Container type="container" pr="0px" pl="0px">
          <ApplyCoupon price={cartTotal} coupon={appliedCoupon} />
        </Container>
      </Section>
      <Section mb="0" bg="sectionBgDark" display="flex" p="10px 0rem 15px">
        <Container type="container" pr="0rem" pl="0rem">
          {results.map(item => (
            <div>
              {item.is_display ? (
                <React.Fragment key={item.id_customer_cart}>
                  <div className={styles.prodInlineBlockWrapper} key={item.id_customer_cart}>
                    <ProductItem
                      Pname={item.product_info.name}
                      Pimage={item.product_info.image}
                      deliveryBy={item.product_info.delivery_time_text}
                      specialPrice={item.product_info.special_price}
                      unitPrice={item.product_info.unit_price}
                      netPrice={item.product_info.net_price}
                      discount={item.product_info.discount}
                      couponDiscount={item.product_info.couponDiscount}
                      coupon={appliedCoupon}
                      cartItemLoading={cartItemLoading}
                      cartId={item.id_customer_cart}
                      cart_ids={item.cart_ids}
                      quantity={item.qty}
                      simpleSku={item.simple_sku}
                      skuId={item.configurable_sku}
                      demoProduct={item.product_info.demo_product}
                      handleCheckboxClick={handleCheckboxClick(
                        item.simple_sku,
                        item,
                        selectForDemo
                      )(addToSelectForDemo)}
                      checked={isSelected(item.simple_sku, selectForDemo)}
                      landingPageLink={demoLandingPageUrl}
                      onDelete={() => onDelete(item.simple_sku, item, selectForDemo)(addToSelectForDemo)}
                      configId={item.product_info && item.product_info.product_id ? item.product_info.product_id : ''}
                      assembly={item.product_info.assembly_service}
                      productURL={
                        item.product_info.packageId
                          ? `/package-catalog/${item.product_info.packageId}`
                          : formatProductURL(item.product_info.name, item.configurable_sku)
                      }
                      isPackage={item.product_info.packageId ? true : false}
                      packageId={item.product_info.packageId}
                      offerMessage={item.product_info.offer_message}
                    />
                    {cartItemLoading(item.product_info.product_id) && (
                      <div className={styles.loadingCart}>
                        <h4>PLEASE WAIT...</h4>
                        <p>WHILE IT UPDATES</p>
                      </div>
                    )}
                    {cartItemLoading(item.id_customer_cart) && (
                      <div className={styles.loadingCart}>
                        <h4>PLEASE WAIT...</h4>
                        <p>WHILE IT UPDATES</p>
                      </div>
                    )}
                    {isProductOutofStock(item.configurable_sku) && !item.product_info.packageId && (
                      <div className={styles.loadingCart}>
                        <h4>
                          This product is out of stock please remove before proceed.
                          <br />
                          <Button
                            fontSize="0.875rem"
                            fontFamily="light"
                            color="#f98d29"
                            btnType="link"
                            p="0"
                            mt="0.3125rem"
                            onClick={
                              item.product_info.packageId
                                ? onClick(
                                    {
                                      // skuData: getSkusData(item.simpleSkus),
                                      packageId: item.product_info.packageId,
                                      cartIds: item.cart_ids
                                    },
                                    sessionId,
                                    pincode,
                                    item.qty,
                                    item.product_info.product_id,
                                    item.simple_sku,
                                    item,
                                    selectForDemo,
                                    appliedCoupon
                                  )(removeFromCart)(addToSelectForDemo)
                                : onClick(
                                    {
                                      cartIds: item.cart_ids
                                    },
                                    sessionId,
                                    pincode,
                                    item.qty,
                                    item.product_info.product_id,
                                    item.simple_sku,
                                    item,
                                    selectForDemo,
                                    appliedCoupon
                                  )(removeFromCart)(addToSelectForDemo)
                            }
                          >
                            Remove
                          </Button>
                        </h4>
                      </div>
                    )}
                  </div>
                  {/* {item.freebie_info && item.freebie_info.name ? (
                    <div
                      className={styles.prodInlineBlockWrapper}
                      key={item.id_customer_cart}
                      style={{ display: "inline-block", background: "#fbfbfb" }}
                    >
                      <Div
                        p="10px"
                        m="-10px -10px 10px"
                        style={{
                          background: "#28a745",
                          color: "#FFF",
                          fontSize: 14,
                          width: "calc(100% + 20px)",
                          borderRadius: "4px 4px 0 0"
                        }}
                        ta="center"
                      >
                        Get Free
                      </Div>
                      <ProductInline
                        name={item.freebie_info.name}
                        image={item.freebie_info.image}
                        specialPrice={item.freebie_info.special_price}
                        unitPrice={item.freebie_info.unit_price}
                        savings={
                          item.freebie_info.unit_price -
                          item.freebie_info.net_price
                        }
                        qty={item.qty}
                        productURL={formatProductURL(
                          item.freebie_info.name,
                          item.configurable_sku
                        )}
                        formatAmount={formatAmount}
                        configId={
                          item.freebie_info && item.freebie_info.product_id
                            ? item.freebie_info.product_id
                            : ""
                        }
                      />
                      <Div col="12" ta="left" pl="38%" style={{ top: "-20px" }}>
                        <Label color="textLight" mb="0" mt="0">
                          Qty. {item.freebie_info.qty}
                        </Label>
                      </Div>
                      <Div
                        col={item.freebie_info.assembly_service ? "6" : "12"}
                        mt="0.3125rem"
                      >
                        <Img
                          width="initial"
                          height="20px"
                          mb="0"
                          mr="0.625rem"
                          mt="3px"
                          float="left"
                          src={calendarImage}
                        />
                        <Text color="#575757" fontSize="0.75rem" mt="0" mb="0">
                          Delivery Details
                        </Text>
                        <Text
                          color={
                            item.freebie_info.delivery_time_text &&
                            item.freebie_info.delivery_time_text.indexOf(
                              "Currently"
                            ) === -1
                              ? "green"
                              : "red"
                          }
                          fontSize="0.75rem"
                          mt="0"
                        >
                          {item.freebie_info.delivery_time_text}
                        </Text>
                      </Div>
                      {item.freebie_info.assembly_service && (
                        <Div
                          col="6"
                          color="uspTitle"
                          fontSize="0.75rem"
                          mt="0.3125rem"
                        >
                          <Img
                            width="initial"
                            height="20px"
                            mr="0.625rem"
                            mt="4px"
                            mb="20px"
                            float="left"
                            src={assemblyIcon}
                          />
                          <Text
                            color="#575757"
                            fontSize="0.75rem"
                            mt="0"
                            mb="0"
                          >
                            Assembly
                          </Text>
                          <Text fontSize="0.75rem" mt="0" mb="0">
                            Offered By Hometown
                          </Text>
                          <a
                            data-tip="Assembly will be done within 48hrs of Delivery & applicable within serviceable limits"
                            data-event="click focus"
                            className="detailsLink"
                          >
                            Details
                          </a>
                          <ReactTooltip globalEventOff="click" />
                        </Div>
                      )}

                      {cartItemLoading(item.id_customer_cart) && (
                        <div className={styles.loadingCart}>
                          <h4>PLEASE WAIT...</h4>
                          <p>WHILE IT UPDATES</p>
                        </div>
                      )}
                      {isProductOutofStock(item.configurable_sku) && (
                        <div className={styles.loadingCart}>
                          <h4>
                            This product is out of stock please remove before
                            proceed.
                            <br />
                            <Button
                              fontSize="0.875rem"
                              fontFamily="light"
                              color="#f98d29"
                              btnType="link"
                              p="0"
                              mt="0.3125rem"
                              onClick={
                                item.product_info.packageId
                                  ? onClick(
                                      {
                                        skuData: getSkusData(item.simpleSkus),
                                        packageId: item.product_info.packageId
                                      },
                                      sessionId,
                                      pincode,
                                      item.qty,
                                      item.freebie_info.product_id,
                                      item.simple_sku,
                                      item,
                                      selectForDemo,
                                      appliedCoupon
                                    )(removeFromCart)(addToSelectForDemo)
                                  : onClick(
                                      {
                                        cartIds: item.cart_ids
                                      },
                                      sessionId,
                                      pincode,
                                      item.qty,
                                      item.freebie_info.product_id,
                                      item.simple_sku,
                                      item,
                                      selectForDemo,
                                      appliedCoupon
                                    )(removeFromCart)(addToSelectForDemo)
                              }
                            >
                              Remove
                            </Button>
                          </h4>
                        </div>
                      )}
                      <div className={styles.freebieCartItem} />
                    </div>
                  ) : null} */}
                </React.Fragment>
              ) : null}
            </div>
          ))}
          <Offers cartEmiDetails={summary} />
          <ApplayGiftWrapper />
          <PriceSummary summaryPrice={summary} />
          <div className={styles.unbox_alosbought}>
            <div id="unbxd_also_bought"></div>
          </div>
          <HappyToHelp data={cartContact} />
        </Container>
      </Section>
    </Div>
  );
};

Cart.propTypes = {
  demoProductsBanner: PropTypes.bool,
  results: PropTypes.array,
  pincode: PropTypes.string,
  cartUpdating: PropTypes.bool,
  currentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sessionId: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  outOfStockList: PropTypes.array,
  handlePincodeModal: PropTypes.func.isRequired,
  demoLandingPageUrl: PropTypes.string,
  addToSelectForDemo: PropTypes.func.isRequired,
  selectForDemo: PropTypes.array
};

Cart.defaultProps = {
  demoProductsBanner: false,
  results: [],
  pincode: '',
  cartUpdating: false,
  currentId: '',
  outOfStockList: [],
  demoLandingPageUrl: '',
  selectForDemo: []
};

export default connect(mapStateToProps, {
  ...actionCreators,
  ...actionCreatorsForDemo
})(Cart);
