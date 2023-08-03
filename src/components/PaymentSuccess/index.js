import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import { Link } from 'react-router-dom';


const successfull = require('../../../static/successful.svg');
const styles = require('./PaymentSuccess.scss');

const mapStateToProps = ({ paymentstatus: { data, loaded, error } }) => ({
  isLoaded: loaded,
  error,
  data
});

/* eslint-disable camelcase */
const PaymentSuccess = ({
  isLoaded,
  error,
  data: {
    order_no,
    order_date,
    shipping_address,
    cart_products,
    sub_total_amount,
    shipping_charges,
    discount_coupon_value,
    set_discount,
    net_order_amount,
    instant_discount
  }
}) => {
  if (isLoaded && !error && shipping_address) {
    return (
      <Div type="block">
        <Container type="container" pr="0" pl="0">
          <Section  display="block" mt="0" p="2rem 1.5rem" mb="0" height="auto">
            <Row display="block" mr="0" ml="0">
              <Div col="12" mt="30px">
                <Img width="4.5rem" mb="25px" m="auto" float="none" src={successfull} alt="Test" />
                <Heading ellipsis={false} mb="0.625rem" ta="center" fontSize="16px" color="black">
                  Thank you for placing your <br></br> Order with us.
                </Heading>
                <Div mt="20px" style={{width: '80%', height: '100%', marginLeft:'10%', borderRadius: '5px', border:'1px solid #E7E7E7'}}>
                 <Text ta="center" style={{fontSize: '14px', color:'#999999', fontWeight:'bold' }}>
                 Click here to see Details
                 </Text>
                 <Link to="payment-details">
                 <Text ta="center" style={{fontSize: '14px', color:'#F47020', fontWeight:'bold'}}>
                 Order Details
                 </Text>
                 </Link>
                </Div>
              </Div>
            </Row>
          </Section>
        </Container>
      </Div>
    );
  }
  return null;
};

PaymentSuccess.defaultProps = {
  data: {
    order_date: '',
    shipping_address: {
      first_name: '',
      last_name: '',
      address1: '',
      city: '',
      postcode: '',
      state: ''
    },
    sub_total_amount: 0,
    shipping_charges: 0,
    discount_coupon_value: 0,
    set_discount: 0,
    net_order_amount: 0,
    cart_products: [],
    instant_discount: 0
  },
  isLoaded: false,
  error: ''
};

PaymentSuccess.propTypes = {
  data: PropTypes.shape({
    order_no: PropTypes.string.isRequired,
    order_date: PropTypes.string,
    shipping_address: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      address1: PropTypes.string,
      city: PropTypes.string,
      postcode: PropTypes.string,
      state: PropTypes.string
    }),
    cart_products: PropTypes.array,
    sub_total_amount: PropTypes.number,
    shipping_charges: PropTypes.number,
    discount_coupon_value: PropTypes.number,
    set_discount: PropTypes.number,
    net_order_amount: PropTypes.number,
    instant_discount: PropTypes.number
  }),
  isLoaded: PropTypes.bool,
  error: PropTypes.string
};

export default connect(mapStateToProps, null)(PaymentSuccess);
