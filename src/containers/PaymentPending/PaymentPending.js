import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentPending from 'components/PaymentPending';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import { connect } from 'react-redux';

// Constants
import { PAYMENT_SUCCESS, PAYMENT_FAILURE } from 'helpers/Constants';

@connect(({ app: { orderId }, paymentstatus: { data, loaded, error }, userLogin: { isLoggedIn } }) => ({
  orderId,
  data,
  loaded,
  error,
  isLoggedIn
}))
export default class PaymentPendingContainer extends Component {
  static propTypes = {
    orderId: PropTypes.number,
    data: PropTypes.object,
    error: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    history: PropTypes.object.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    orderId: '',
    data: {},
    error: '',
    isLoggedIn: false
  };

  componentDidMount() {
    const {
      error, orderId, data, history, isLoggedIn
    } = this.props;

    if (data) {
      // eslint-disable-next-line camelcase
      const { error_message = '' } = data || {};
      const paymentStatus = data[orderId].payment_status;

      // eslint-disable-next-line camelcase
      if (error_message && error_message.indexOf('Order Success details not found') >= 0) {
        if (isLoggedIn) {
          return history.push('/my-orders');
        }
        return history.push('/');
      }
      if (data === 'An internal server error occurred' || data.error_message === 'details not found') {
        if (isLoggedIn) {
          return history.push('/my-orders');
        }
        return history.push('/');
      }
      if (error === '' && paymentStatus === 'failed') {
        history.push(PAYMENT_FAILURE);
      } else if (error === '' && paymentStatus === 'success') {
        history.push(PAYMENT_SUCCESS);
      }
    } else {
      history.push('/');
    }
  }
  render() {
    const {
      match: {
        params: { orderId }
      }
    } = this.props;
    return (
      <div>
        <Menu />
        <PaymentPending orderId={orderId} />
        <Footer />
      </div>
    );
  }
}

PaymentPendingContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};
