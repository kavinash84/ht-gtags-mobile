import React from 'react';
import Div from 'hometown-components/lib/Div';

const styles = require('./PaymentBreadcrumb.scss');
class PaymentBreadcrumb extends React.Component {
  render() {
    return (
      <Div className={styles.PBContainer}>
        <div className={styles.PBContainerInnner}>
          <div className={styles.PBItem}>
            <div className={styles.number}>1</div>
            <div className={styles.text}>Shopping Cart</div>
          </div>
          <div className={styles.PBItem}>
            <div className={styles.number}>2</div>
            <div className={styles.text}>Address</div>
          </div>
          <div className={styles.PBItemActive}>
            <div className={styles.number}>3</div>
            <div className={styles.text}>Payment</div>
          </div>
        </div>
      </Div>
    );
  }
}

export default PaymentBreadcrumb;