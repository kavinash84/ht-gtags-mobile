import React, { Component } from 'react'
import OrderContainer from '../../components/Order/Order';
import SuccessMenu from '../../components/Order/SuccessMenu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { paymentLoaded as setPaymentLoadStatus, setEmiPaymentType } from 'redux/modules/app';

@connect(({ paymentstatus: { data, loaded, error }, userLogin: { isLoggedIn }, app: { paymentLoaded } }) => ({
    data,
    loaded,
    error,
    isLoggedIn,
    paymentLoaded
  }))

class Order extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        error: PropTypes.string,
        paymentLoaded: PropTypes.string,
        loaded: PropTypes.bool,
        // isLoggedIn: PropTypes.bool,
        history: PropTypes.object.isRequired
      };
      static contextTypes = {
        store: PropTypes.object.isRequired
      };
      static defaultProps = {
        data: '',
        error: '',
        paymentLoaded: false,
        loaded: false
        // isLoggedIn: false
      };

      componentDidMount() {
        const {
          history, data, error, paymentLoaded
        } = this.props;
      }
    render() { 
        const { data, error, loaded } = this.props;
        return <div>
        <SuccessMenu/>
        {data ? <OrderContainer data={data} error={error} loaded={loaded} /> : ''}

        </div>;
    }
}
 
export default Order;