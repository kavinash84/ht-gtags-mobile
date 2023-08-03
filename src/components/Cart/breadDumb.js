import React from 'react';
import Div from 'hometown-components/lib/Div';

const styles = require('./CB.scss');
class CartBreadCumb extends React.Component {
  state = {
    currentRoute: '/checkout/cart'
  };
  componentDidMount() {
    const location = window.location.pathname;
    this.setState({ currentRoute: location });
  }
  render() {
    const { currentRoute } = this.state;
    return (
      <Div className={styles.CBContainer}>
        <div className={styles.CBContainerInnner}>
          <div className={currentRoute === '/checkout/cart' ? styles.CBItemActive : styles.CBItem}>
            <div className={styles.number}>1</div>
            <div className={styles.text}>Shopping Cart</div>
          </div>
          <div className={currentRoute === '/checkout/delivery-address' ? styles.CBItemActive : styles.CBItem}>
            <div className={styles.number}>2</div>
            <div className={styles.text}>Address</div>
          </div>
          <div className={currentRoute === '/checkout/payment-options' ? styles.CBItemActive : styles.CBItem}>
            <div className={styles.number}>3</div>
            <div className={styles.text}>Payment</div>
          </div>
        </div>
      </Div>
    );
  }
}

export default CartBreadCumb;
