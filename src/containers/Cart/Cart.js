/* eslint-disable max-len */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import CartContainer from "components/Cart";
import Menu from "components/CartMenue";
import Heading from "hometown-components/lib/Heading";
import Div from "hometown-components/lib/Div";
import Section from "hometown-components/lib/Section";
import Empty from "hometown-components/lib/Empty";
import Img from "hometown-components/lib/Img";
import OrderSummary2 from "components/Cart/orderSummary2";
import Pincode from "components/Pincode";
import ResponsiveModal from "components/Modal";
import Footer from "components/Footer";

import { getCartList, getStockOutProducts } from "selectors/cart";
import { resetCheck, checkCart } from "redux/modules/cart";
import { addToSelectForDemo } from "redux/modules/selectForDemo";
import { WEViewCart } from "../../redux/modules/cart";
import NewUnboxRecomondedForYou from "../../components/NewUnboxWidges/recomondedForYou";

const CartEmptyIcon = require("../../../static/cart-empty.png");
const PincodeModalIcon = require("../../../static/map-placeholder.svg");

const demoProductsBanner = cart =>
  cart.some(({ product_info: { demo_product: demoProduct } }) => demoProduct);

@connect(
  ({
    cart: { cartChecked, summary, error, loading, loaded, checkingCart },
    app,
    cart,
    selectForDemo,
    paymentoptions
  }) => ({
    results: getCartList(cart),
    isCartChecked: cartChecked,
    summary,
    error,
    loading,
    loaded,
    checkingCart,
    session: app.sessionId,
    outOfStockList: getStockOutProducts(cart),
    demoLandingPageUrl: cart.demo_mobile_landing_page_url,
    selectForDemo: selectForDemo.data,
    bflMinAmount: paymentoptions.bflMinAmount
  }),
  {
    resetCheckKey: resetCheck
  }
)
export default class Cart extends Component {
  static contextTypes = {
    store: PropTypes.object
  };
  static propTypes = {
    results: PropTypes.array,
    loading: PropTypes.bool,
    summary: PropTypes.object,
    isCartChecked: PropTypes.bool,
    history: PropTypes.object.isRequired,
    resetCheckKey: PropTypes.func.isRequired,
    session: PropTypes.string.isRequired,
    outOfStockList: PropTypes.array,
    checkingCart: PropTypes.bool.isRequired,
    demoLandingPageUrl: PropTypes.string,
    selectForDemo: PropTypes.object,
    bflMinAmount: PropTypes.number.isRequired
  };
  static defaultProps = {
    results: [],
    loading: false,
    summary: null,
    isCartChecked: false,
    outOfStockList: [],
    demoLandingPageUrl: "",
    selectForDemo: {}
  };
  state = {
    responsiveModalContent: null,
    open: false,
    emiPopUpShown: false,
    displayCart: true
  };

  componentDidMount() {
    const {
      summary: { total }
    } = this.props;
    const { dispatch } = this.context.store;
    const { results } = this.props;
    if (results && results.length) {
      dispatch(WEViewCart());
    }
    window.scroll(0, 0);

   console.log('view_cart')
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
  "event": "view_cart",
 "pagetype": "",
  'source_page_url': window.location.href,
  'previous_page_url': "",
  'destination_page_url': "",
  'login_status': "",
  'user_id': "",
  'page_url': window.location.href,
  'banner_id': "",
  'click_text': "",
  ecommerce: {
  currency: "INR",
  value: this.props.summary.total,
  items: this.props.results.map((result,idx)=>{
    return  {
      item_id: result.product_info.product_id,
      item_name: result.product_info.name,
      affiliation: "",
      coupon: result.coupon_code,
      discount: result.product_info.discount,
      index: idx,
      item_brand: result.product_info.brand,
      item_category: "",
      item_category2: "",
      item_category3: "",
      item_category4: "",
      item_category5: "",
      item_list_id: "",
      item_list_name: "",
      item_variant: result.product_info.color,
      location_id: "",
      price: result.product_info.net_price,
      quantity: result.qty
      };
  })
}
 });

    

  }

  componentWillReceiveProps(nextProps) {
    const {
      isCartChecked,
      history,
      resetCheckKey,
      summary: { total }
    } = this.props;
    const {
      summary: { total: nextPropsTotal }
    } = nextProps;

    if (!isCartChecked && nextProps.isCartChecked) {
      const { dispatch } = this.context.store;
      dispatch(resetCheckKey());
      return history.push("/checkout/delivery-address");
    }
  }

  checkCartBeforeCheckout = e => {
    e.preventDefault();
    const { session } = this.props;
    const { dispatch } = this.context.store;
    dispatch(checkCart(session));
    dispatch(addToSelectForDemo([]));
  };

  handleModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      open: !this.state.open
    });
  };

  handlePincodeModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      openPincode: !this.state.openPincode
    });
  };

  handlePincodeModal = e => {
    const { open } = this.state;
    if (e) {
      e.preventDefault();
    }
    this.setState({
      open: !open,
      responsiveModalContent: open ? null : "pincodeModal"
    });
  };

  render() {
    const {
      results,
      summary,
      summary: { total },
      checkingCart,
      outOfStockList,
      demoLandingPageUrl,
      selectForDemo,
      bflMinAmount,
      loading
    } = this.props;
    const { responsiveModalContent, open, displayCart } = this.state;

    

//     window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
//     window.dataLayer.push({
//   "event": "view_cart",
//  "pagetype": "",
//   'source_page_url': window.location.href,
//   'previous_page_url': "",
//   'destination_page_url': "",
//   'login_status': "",
//   'user_id': "",
//   'page_url': window.location.href,
//   'banner_id': "",
//   'click_text': "",
//   ecommerce: {
//   currency: "INR",
//   value: this.props.summary.total,
//   items: this.props.results.map((result,idx)=>{
//     return  {
//       item_id: result.product_info.product_id,
//       item_name: result.product_info.name,
//       affiliation: "",
//       coupon: result.coupon_code,
//       discount: result.product_info.discount,
//       index: idx,
//       item_brand: result.product_info.brand,
//       item_category: "",
//       item_category2: "",
//       item_category3: "",
//       item_category4: "",
//       item_category5: "",
//       item_list_id: "",
//       item_list_name: "",
//       item_variant: result.product_info.color,
//       location_id: "",
//       price: result.product_info.net_price,
//       quantity: result.qty
//       };
//   })
// }
//  });

    const productIds =
      Array.isArray(results) && results.length
        ? results.map(item => {
            if (item.product_info && item.product_info.product_id)
              return item.product_info.product_id;
            else return "";
          })
        : [];

    console.log(
      productIds.filter(item => item !== ""),
      "results"
    );
    return (
      <div>
        <Helmet>
          <script type="text/javascript">
            {`
             !function(f,b,e,v,n,t,s)
             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
             n.queue=[];t=b.createElement(e);t.async=!0;
             t.src=v;s=b.getElementsByTagName(e)[0];
             s.parentNode.insertBefore(t,s)}(window, document,'script',
             'https://connect.facebook.net/en_US/fbevents.js');
             fbq('init', '1024172491523922');
             fbq('track', 'add to cart');                         
            `}
          </script>
          <script
            defer
            src="https://www.googletagmanager.com/gtag/js?id=AW-845903914"
          ></script>
          <script type="text/javascript" defer>
            {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
           
             gtag('config', 'AW-845903914');
            `}
          </script>
        </Helmet>
        <Menu />
        {results && results.length === 0 ? (
          <Section display="flex" p="0" pt="0.625rem" mb="0">
            {loading ? (
              <div
                style={{
                  height: "calc(100vh - 60px)",
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                  fontWeight: 600
                }}
              >
                Please Wait...
              </div>
            ) : (
              <Empty
                title="SORRY!"
                subTitle="Your cart is currently empty!"
                btnName="Shop Now"
                url="/"
                bg="#fafafa"
                height="calc(100vh - 60px)"
              >
                <Img
                  src={CartEmptyIcon}
                  width="200px"
                  m="auto"
                  alt="Sorry no results found"
                />
              </Empty>
            )}
          </Section>
        ) : (
          <div>
            <CartContainer
              demoProductsBanner={demoProductsBanner(results)}
              results={results}
              summary={summary}
              handlePincodeModal={this.handlePincodeModal}
            />
            <OrderSummary2
              totalItem={results.length}
              totalCart={summary.total}
              onClickProceed={this.checkCartBeforeCheckout}
              savings={summary.savings}
              shipping={summary.shipping_charges}
              loadingnextstep={checkingCart}
              itemsCount={summary.items_count}
              setDiscount={
                summary.combined_set_discount
                  ? Number(summary.combined_set_discount)
                  : 0
              }
              outOfStockList={outOfStockList}
              btnText="CHECKOUT"
              landingPageLink={demoLandingPageUrl}
              selectedForDemo={selectForDemo.length !== 0}
            />
            <NewUnboxRecomondedForYou
              pageInfo={{
                pageType: "CART",
                productIds: productIds.filter(item => item !== "")
              }}
            />
            <ResponsiveModal
              classNames={{
                overlay: "pincodeModalModal",
                modal: "pincodeModal"
              }}
              onCloseModal={this.handleModal}
              open={open}
            >
              {responsiveModalContent === "pincodeModal" ? (
                <Div>
                  <Img
                    width="80px"
                    m="auto"
                    mb="1.25rem"
                    src={PincodeModalIcon}
                    alt="Pincode"
                  />
                  <Heading
                    ellipsis={false}
                    color="rgba(0.0.0.0.8)"
                    ta="center"
                    fontSize="1.125rem"
                    mb="1rem"
                    lh="1.5"
                    fontFamily="light"
                  >
                    Please enter your Pincode to serve you better
                  </Heading>
                  <Pincode color="#f2f2f2" onCloseModal={this.handleModal} />
                </Div>
              ) : null}
            </ResponsiveModal>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
