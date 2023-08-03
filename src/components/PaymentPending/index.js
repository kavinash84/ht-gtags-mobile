import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import Empty from 'hometown-components/lib/Empty';
import Text from 'hometown-components/lib/Text';
import { CART_URL } from 'helpers/Constants';

const PaymentPendingIcon = require('../../../static/pending-payment.svg');

const PaymentPending = () => (
  <Div type="block">
    <Container type="container" pr="0" pl="0">
      <Section display="flex" p="0" mb="0">
        <Empty
          title="Payment pending"
          subTitle="You will be taken to a confirmation page when your payment is complete, or you can leave this page
          while your payment is being processed and return later.
          You will be sent a confirmation email once payment is received."
          url={CART_URL}
          bg="#fafafa"
        >
          <Img width="80px" src={PaymentPendingIcon} ml="auto" mr="auto" mt="20px" alt="Payment Pending" />
          <Text ta="center" fontSize="1.125rem" color="rgba(93, 91, 91, 0.9)" ml="auto" mr="auto" mb="0.625rem">
            Your payment is being verified. Please do check your mail after 30 mins
          </Text>
        </Empty>
      </Section>
    </Container>
  </Div>
);

export default PaymentPending;
