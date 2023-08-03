import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PaymentOptionsContainer from "components/Checkout/PaymentOptions";
// import Menu from 'components/OtherMenu';
import { getPaymentOptions } from "selectors/payments";
import { getCartList } from "selectors/cart";
import { CART_URL } from "helpers/Constants";
import PaymentMenu from "../../components/Checkout/PaymentMenu";

@connect(({ paymentoptions, cart, address: { shipping } }) => ({
  availableOptions: getPaymentOptions(paymentoptions),
  paymentOptionsError: paymentoptions.error,
  cart: getCartList(cart),
  shipping
}))
export default class PaymentOptions extends Component {
  componentDidMount() {
    const {
      cart,
      history,
      shipping: { pincode, fullName, phone }
    } = this.props;
    if (
      (cart && cart.length === 0) ||
      pincode === "" ||
      fullName === "" ||
      phone === ""
    ) {
      history.push(CART_URL);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { paymentOptionsError, history } = this.props;
    if (prevProps.paymentOptionsError !== paymentOptionsError) {
      if (paymentOptionsError === "Cart total mismatch") {
        history.push(CART_URL);
      }
    }
  }
  render() {
    const { availableOptions } = this.props;
    return (
      <div>
        {/* <Menu hideright /> */}
        <PaymentMenu />
        <PaymentOptionsContainer data={availableOptions} />
      </div>
    );
  }
}

PaymentOptions.defaultProps = {
  availableOptions: {},
  cart: [],
  history: {},
  shipping: {
    fullName: "",
    phone: "",
    pincode: ""
  }
};

PaymentOptions.propTypes = {
  availableOptions: PropTypes.object,
  history: PropTypes.object,
  cart: PropTypes.array,
  shipping: PropTypes.shape({
    fullName: PropTypes.string,
    pincode: PropTypes.string,
    phon: PropTypes.string
  })
};
