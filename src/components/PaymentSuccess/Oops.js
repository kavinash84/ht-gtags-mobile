import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import Empty from 'hometown-components/lib/Empty';

const PaymentFailedIcon = require('../../../static/failed.svg');

const Oops = () => (
  <Div type="block">
    <Container type="container" pr="0" pl="0">
      <Section display="flex" p="0" mb="0">
        <Empty title="Duhh !!! Something Fishy " subTitle="" btnName="Go to Home" url="/">
          <Img width="80px" src={PaymentFailedIcon} m="auto" alt="Error During Payment" />
        </Empty>
      </Section>
    </Container>
  </Div>
);

export default Oops;
