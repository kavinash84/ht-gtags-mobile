import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import { CART_URL } from 'helpers/Constants';
import { Link } from 'react-router-dom';

const PaymentFailed = require('../../../static/order-failure.svg')

const PaymentFailure = () => (
  <Div type="block">
    <Container type="container" pr="0" pl="0">
          <Section  display="block" mt="0" p="2rem 1.5rem" mb="0" height="auto">
            <Row display="block" mr="0" ml="0">
              <Div col="12" mt="30px">
                <Img width="4.5rem" m="auto" mb="25px" float="none" src={PaymentFailed} alt="Test" />
                <Heading ellipsis={false} mb="0.625rem" ta="center" fontSize="16px" color="black">
                Dear Customer, The Payment for <br></br> your order was not successful
                </Heading>
                <Div mt="20px" style={{width: '80%', height: '100%', marginLeft:'10%', borderRadius: '5px', border:'1px solid #E7E7E7'}}>
                 <Text ta="center" style={{fontSize: '14px', color:'#999999', fontWeight:'bold' }}>
                 You can try a different payment mode
                 </Text>
                 <Link to={ CART_URL }>
                 <Text ta="center" style={{fontSize: '14px', color:'#F47020', fontWeight:'bold'}}>
                 Retry Payment
                 </Text>
                 </Link>
                </Div>
              </Div>
            </Row>
          </Section>
        </Container>
  </Div>
);

export default PaymentFailure;
