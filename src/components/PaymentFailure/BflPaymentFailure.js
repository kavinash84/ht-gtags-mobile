import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import Empty from 'hometown-components/lib/Empty';
import { CART_URL } from 'helpers/Constants';

const PaymentFailedIcon = require('../../../static/failed.svg');

const PaymentFailure = () => (
  <Div type="block">
    <Container type="container" pr="0" pl="0">
      <Section display="flex" p="0" mb="0">
        <Empty
          title="Dear Customer, There is an issue with Bajaj Finance."
          subTitle="Please try another Payment Method to complete your transaction"
          btnName="Try Again"
          url={CART_URL}
          bg="#fafafa"
        >
          <Img width="80px" src={PaymentFailedIcon} m="auto" alt="Error During Payment" />
        </Empty>
      </Section>
    </Container>
  </Div>
);

export default PaymentFailure;
