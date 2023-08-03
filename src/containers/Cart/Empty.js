import React from 'react';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Container from 'hometown-components/lib/Container';
import Menu from 'components/OtherMenu';

const CartEmptyIcon = require('../../../static/cart-empty.png');

const EmptyContainer = () => (
  <div>
    <Menu filter search />
    <Div type="block">
      <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
        <Container type="container" pr="1rem" pl="1rem">
          <Row display="block" mr="0" ml="0">
            <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="medium">
              My Cart
            </Heading>
          </Row>
        </Container>
      </Section>
      <Section display="flex" p="0" mb="0" bg="sectionBgDark" boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)">
        <Empty title="Your cart is currently empty!" subTitle="Add items to it" btnName="Shop Now" url="/" bg="#fafafa">
          <Img src={CartEmptyIcon} width="initial" m="auto" alt="Your cart is currently empty!" />
        </Empty>
      </Section>
    </Div>
  </div>
);

export default EmptyContainer;
