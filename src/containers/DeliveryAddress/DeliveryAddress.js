import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AddressContainer from 'components/Checkout/DeliveryAddress';
import Menu from 'components/CartMenue';
// import Helmet from 'react-helmet';
import { getCartList } from 'selectors/cart';
import { CART_URL } from 'helpers/Constants';
import CartBreadCumb from '../../components/Cart/breadDumb';

@connect(({ cart, userLogin, address }) => ({
  cart: getCartList(cart),
  isLoggedIn: userLogin.isLoggedIn,
  addNewAddress: address.addNewAddress
}))
@withRouter
export default class DeliveryAddressContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { cart, history } = this.props;
    if (cart && cart.length === 0) {
      history.push(CART_URL);
    }
  }

  render() {
    const { addNewAddress } = this.props;
    return (
      <div>
        {/* <Helmet title="Delivery Address" /> */}
        {!addNewAddress && (
          <React.Fragment>
            <Menu />
            <CartBreadCumb />
          </React.Fragment>
        )}
        <AddressContainer />
      </div>
    );
  }
}

DeliveryAddressContainer.defaultProps = {
  cart: [],
  history: {}
};

DeliveryAddressContainer.propTypes = {
  history: PropTypes.object,
  cart: PropTypes.array
};
